from flask import Flask, request, render_template
import os
import cv2
import requests
from matplotlib import rcParams
from PIL import Image
import matplotlib.pyplot as plt
import torch

import numpy as np
from io import BytesIO
import base64

# You may need to restart your runtime prior to this, to let your installation take effect
# Some basic setup:
# Setup detectron2 logger

import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

# import some common libraries
import numpy as np
import cv2
import random
#from google.colab.patches import cv2_imshow

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog
from detectron2.data.catalog import DatasetCatalog


from detectron2.utils.visualizer import ColorMode
import glob


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'

#test evaluation
from detectron2.data import DatasetCatalog, MetadataCatalog, build_detection_test_loader
from detectron2.evaluation import COCOEvaluator, inference_on_dataset


from roboflow import Roboflow
rf = Roboflow(api_key="rSyKqK8ZleKk72WAPmw3")
project = rf.workspace("object-detection-vmxxo").project("object-detection-ltqfj")
dataset = project.version(9).download("coco")

from detectron2.data.datasets import register_coco_instances
register_coco_instances("my_dataset_train", {}, "Object-Detection-9/train/_annotations.coco.json", "Object-Detection-9/train")
register_coco_instances("my_dataset_val", {}, "Object-Detection-9/valid/_annotations.coco.json", "Object-Detection-9/valid")
register_coco_instances("my_dataset_test", {}, "Object-Detection-9/test/_annotations.coco.json", "Object-Detection-9/test")



cfg = get_cfg()
cfg.MODEL.DEVICE = 'cpu'

cfg.merge_from_file(model_zoo.get_config_file("COCO-Detection/faster_rcnn_X_101_32x8d_FPN_3x.yaml"))
cfg.DATASETS.TRAIN = ("my_dataset_train",)
cfg.DATASETS.TEST = ("my_dataset_val",)

cfg.DATALOADER.NUM_WORKERS = 4
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-Detection/faster_rcnn_X_101_32x8d_FPN_3x.yaml")  
# Let training initialize from model zoo
cfg.SOLVER.IMS_PER_BATCH = 6
cfg.SOLVER.BASE_LR = 0.001


cfg.SOLVER.WARMUP_ITERS = 1000
cfg.SOLVER.MAX_ITER = 1500 #adjust up if val mAP is still rising, adjust down if overfit
cfg.SOLVER.STEPS = (1000, 1100)
cfg.SOLVER.GAMMA = 0.05




cfg.MODEL.ROI_HEADS.BATCH_SIZE_PER_IMAGE = 64
cfg.MODEL.ROI_HEADS.NUM_CLASSES = 6 #your number of classes + 1

cfg.TEST.EVAL_PERIOD = 500


# Directly provide the full path to the pretrained model weights
cfg.MODEL.WEIGHTS = "model_final1234.pth"

cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.7
predictor = DefaultPredictor(cfg)
test_metadata = MetadataCatalog.get("my_dataset_test")

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def process_image(image_path):
    im = cv2.imread(image_path)
    outputs = predictor(im)
    
    v = Visualizer(im[:, :, ::-1], metadata=test_metadata, scale=0.8)
    out = v.draw_instance_predictions(outputs["instances"].to("cpu"))
    
    # Save the processed image
    processed_image_path = 'static/Images/abc.png'
    out1 = Image.fromarray(out.get_image()[:, :, ::-1])
    out1.save(processed_image_path)
    
    # Extract bounding box coordinates, labels, and confidence scores
    bounding_box_info = []
    for i, bbox in enumerate(outputs["instances"].pred_boxes.tensor):
        x, y, w, h = map(int, bbox)
        label = int(outputs["instances"].pred_classes[i])
        confidence = float(outputs["instances"].scores[i])

        # Map label to corresponding class name
        if label == 1:
            class_name = "Gate_valve"
        elif label == 2:
            class_name = "S_21_Flange"
        elif label == 3:
            class_name = "S_28_SDL-DDL"
        elif label == 4:
            class_name = "Sliding_valve"
        elif label == 5:
            class_name = "th"
        else:
            class_name = "Unknown"  # Add more conditions if needed

        bounding_box_info.append({"coordinates": ((x, y), (x + w, y + h)), "label": class_name, "confidence": confidence})

    return processed_image_path, bounding_box_info

@app.route('/')
def upload_form():
    return render_template('abc.html')

@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        filename = file.filename
        file_path = filename
        file.save(file_path)
        processed_image_path, bounding_box_info = process_image(file_path)
        return render_template('results.html', image_path=processed_image_path, bounding_box_info=bounding_box_info)

"""
if __name__ == "__main__":
    app.run()
"""
        
@app.route('/sai')
def sai():
    return 'Hi sai'

if __name__ == '__main__':
    app.run(debug=True, port=8005)