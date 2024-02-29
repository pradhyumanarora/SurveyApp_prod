This above folder contains all the necessary files needed for running the flask web application that performs symbol detection on engineering diagrams using Facebook AI Research's next generation library Detectron2.

The dataset includes 88 images having 5 symbols manually chosen from the P&ID dataset along with the JSW Dataset. You can access the complete P&ID dataset here: https://www.kaggle.com/datasets/hristohristov21/pid-symbols
The dataset is split into train, test and valid splits and symbols are annotated in COCO format using Roboflow. The dataset can be visible in Object-Detection-9 folder.

For installing Detectron2 in local system:

1. Install VS Microsoft C++ Build Tools on Windows. Follow this guide: https://github.com/bycloudai/InstallVSBuildToolsWindows and reboot the system.

2. Create a virtual environment (env) in VSCode:
     Follow this link: https://stackoverflow.com/questions/75357936/how-to-install-detectron2
     Install the dependencies with the following commands:
     
     a) pip3 install torch torchvision torchaudio
   
     b) git clone https://github.com/facebookresearch/detectron2.git
   
     c) python -m pip install -e detectron2
    
    
For the remaining libraries, follow requirements.txt
pip install -r requirements.txt

The saved weights are available in a google drive link available in weights.txt. Download the weights and add it to your Symbol Detection folder. 

A HTML template is rendered by the Flask application when the user accesses the main page. The template provides a simple form for users to upload an image. Once the user uploads an engineering diagram image from the test folder, the Detectron2 model is applied to it. Subsequently, the user is redirected to a page displaying the processed image with bounding box annotations, along with information such as coordinates, labels, and confidence scores.
