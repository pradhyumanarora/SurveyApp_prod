from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS, cross_origin
import os
import numpy as np
from owl_vit_detect import object_detection
import base64
import cv2
import shutil

    
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def index():
    return "Welcome to the Object Detection API!"

@app.route('/upload', methods=['POST'])
@cross_origin(origin='*')
def upload_files():
    print("Hello")
    try:
        # Ensure 'uploads' folder exists
        if not os.path.exists(app.config['UPLOAD_FOLDER']):
            os.makedirs(app.config['UPLOAD_FOLDER'])

        target_image = request.files['targetImage']
        print(target_image)
        # Check if the target image exists and has an allowed extension (optional)
        if target_image.filename == '' or not allowed_file(target_image.filename):
            print("Invalid")
            return jsonify({'error': 'Invalid target image'}), 400
        target_path = os.path.join(app.config['UPLOAD_FOLDER'], target_image.filename)
        target_image.save(target_path)
        print("Image Saved")
        query_images = []
        print("Hello2")
        print(len(request.files))

        for i in range(1, len(request.files)):
            # print(i)
            query_image = request.files[f'assetsImg{i}']
            print(query_image)
            print("Hoooooo")
            if query_image.filename != '' and allowed_file(query_image.filename):
                query_path = os.path.join(app.config['UPLOAD_FOLDER'], query_image.filename)
                query_image.save(query_path)
                query_images.append(query_path)
        
        image=object_detection()
        print("Outside For Loop")
        _,img_encoded=cv2.imencode(".jpg",image)
        img_base64=base64.b64encode(img_encoded).decode()

        shutil.rmtree("uploads")

        return jsonify({'image':"data:image/jpeg;base64," + img_base64})
        # return jsonify({'status': 'No Error'}),200

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal Server Error'}), 500

def allowed_file(filename):
    allowed_extensions = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

if __name__ == '__main__':
    app.run(debug=True, port=8000)


    




