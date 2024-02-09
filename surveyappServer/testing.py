# import sys, json
# target_image = json.loads(sys.argv[1])
# target_image_path = target_image['path']
# query_image = json.loads(sys.argv[2])
# print('path is:', target_image_path)
# sys.stdout.flush()

# from transformers.utils import send_example_telemetry
# from transformers import OwlViTProcessor, OwlViTForObjectDetection
# from transformers.image_utils import ImageFeatureExtractionMixin
# send_example_telemetry("zeroshot_object_detection_with_owlvit_notebook", framework="pytorch")

# import tensorflow as tf
import os
import cv2
import requests
from matplotlib import rcParams
from PIL import Image
import matplotlib.pyplot as plt
import torch
import numpy as np
arr = np.ones(2, dtype=int)
print(arr)