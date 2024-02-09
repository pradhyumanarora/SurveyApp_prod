# from transformers.utils import send_example_telemetry
# from transformers import OwlViTProcessor, OwlViTForObjectDetection
# from transformers.image_utils import ImageFeatureExtractionMixin
# send_example_telemetry("zeroshot_object_detection_with_owlvit_notebook", framework="pytorch")


# import os
# import cv2
# import requests
# from matplotlib import rcParams
# from PIL import Image
# import matplotlib.pyplot as plt
# import torch
import numpy as np

import sys,json


# Use GPU if available
# if torch.cuda.is_available():
#     device = torch.device("cuda:0")
# else:
#     device = torch.device("cpu")

# print(device)

def object_detection(target_image_path, query_image_path):
    model = OwlViTForObjectDetection.from_pretrained("google/owlvit-base-patch32")
    processor = OwlViTProcessor.from_pretrained("google/owlvit-base-patch32")
    query_image,org_image=[],[]
    for i in os.listdir("uploads"):
        if "query" in i.split(".")[0].lower():
            query_image.append("uploads/"+i)
        elif "img" in i.split(".")[0].lower() or "image" in i.split(".")[0].lower():
            org_image.append("uploads/"+i)

    # Input image
    # for i in org_image:
    #     image = Image.open(i).convert('RGB')
    #     target_sizes = torch.Tensor([Image.open(i).convert('RGB').size[::-1]])
    image = Image.open(target_image_path).convert('RGB')
    target_sizes = torch.Tensor([Image.open(target_image_path).convert('RGB').size[::-1]])
    # Query image
    image_list=[Image.open(query_image_path).convert('RGB')]
    # for i in query_image:
    #     query_img = Image.open(i).convert('RGB')
    #     image_list.append(query_img)

    # Process input and query image
    inputs_list=[]
    j=0
    model=model.to(device)
    for img in image_list:
        inputs = processor(images=image, query_images=img, return_tensors="pt").to(device)
        inputs_list.append(inputs)
        # print(f"Query image {j}")
        # Print input names and shapes
        # for key, val in inputs.items():
            # print(f"{key}: {val.shape}")
        j+=1
    # Get predictions
    j=0
    outputs_list=[]
    for inputs in inputs_list:
        # print(f"Query Image {j}")
        with torch.no_grad():
            outputs = model.image_guided_detection(**inputs)
            outputs_list.append(outputs)
        # for k, val in outputs.items():
        #     if k not in {"text_model_output", "vision_model_output"}:
                # print(f"{k}: shape of {val.shape}")

        # print("\nVision model outputs")
        # for k, val in outputs.vision_model_output.items():
        #     print(f"{k}: shape of {val.shape}")
        # print()
        j+=1
    
    image=np.array(image)
    j=0
    for outputs in outputs_list:
        outputs.logits = outputs.logits.cpu()
        outputs.target_pred_boxes = outputs.target_pred_boxes.cpu()
        results = processor.post_process_image_guided_detection(outputs=outputs, threshold=0.5, nms_threshold=0.3, target_sizes=target_sizes)
        boxes, scores = results[0]["boxes"], results[0]["scores"]
        # print(f"Query {j}: {results}")
        # Draw predicted bounding boxes
        for box, score in zip(boxes, scores):
            box = [int(i) for i in box.tolist()]
            #if score > 0.33 and score <0.40:
            image = cv2.rectangle(image, box[:2], box[2:], (255,255,0), 5)
            if box[3] + 25 > 768:
                y = box[3] - 10
            else:
                y = box[3] + 25
        j+=1
    return cv2.cvtColor(image,cv2.COLOR_BGR2RGB)

target_image = json.loads(sys.argv[1])
target_image_path = target_image['path']
query_image = json.loads(sys.argv[2])
query_image_path = query_image['path']
# output_image = object_detection(target_image_path, query_image_path)
print('model success')
