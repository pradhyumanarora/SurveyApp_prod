1. Frontend runs on ReactJS.
2. To initalize node packages run npm i.
3. to run the frontend run the command npm start
4. 'Add Assets' button is used to add asset image and asset names and send it to the server. 
5. 'Upload File' button is used to upload target image.
6. 'Record Video' button is used to record video and get geolocation in real-time and send it to backend.
7. User must upload asset images and name and give either target image or record video to send the data to backend.
8. handleInputType() function is called to store the input type whether the input type is adding assets, target image or recording images.
9. type of input is stored in useState 'inputType'. Vale of 'inputType' is changed by 'toggleInputType'.
10. according to the value of 'inputType' respective div is made visible for the user to give input. Rest other divs are set to style {display:'none'}.

Adding assets
1. assets are added by using the component 'AssetForm'.
2. useState 'assets' is passed to 'AssetForm' as props.
3. 'assets' is an array of objects containing the details of assets in the following format:
    [
        {id: string, name: string, image: file},
        {id: string, name: string, image: file},
        {id: string, name: string, image: file},
    ]
4. the component 'CiCirclePlus' calls addAsset() function on click.
5. addAsset() function adds another div containing required fields to the useState 'assets'.
6. On entering asset name, handleNameChange() function is called which adds the name of the asset to the 'assets' useState array.
7. on uploading asset image, file is added to 'assets'.
8. 'id' for each asset is handled automatically by the function window.crypto.randomUUID().
9. on clicking 'IoIosCloseCircleOutline' symbol, removeAsste() function is called which removes that particular asset from 'assets' array.

Uploading Target Image
1. a simple input tag to upload the image.
2. uploaded target image is stored in 'file' useState.

Recording Video
1. For recording video, 'RecordView' component is used.
2. When video recording is started, video recording, live geolocation and counter, these 3 functions run simultaneously.
3. recorded video is stored in 'recordedBlob' useState.
4. 'RecordView' further use 'ReactMediaRecorder' library to record video and store it in 'recordedBlob'.
5. 'RecordView' also uses 'useStopwatch' and 'useGeolocated' libraries in react to start timer and live geolocation when video recording is started.

Sending data to server
1. below the input fields, 2 buttons are there, 'Detect with detectron' and 'Detect with OWLViT'.
2. For now, both buttons call the function sendData() and send api to OWLViT.
3. sendData() accepts 1 parameter: 'model' which is the name of the model, 'Detectron' or 'OWLViT'.
4. Inside sendData(), url of api is saved to variable 'url'.
5. if the target image is provided, then target image is added to FormData object and then assets are appended to FormData object.
6. Else if recorded video is provided then recordedBlob is converted to mp4 format and stored in 'targetFile' variable. Then 'targetFile' and assets are appended to FormData object.
7. FormData object is sent to server using POST method.
8. Resulted image is received and stored in 'resultImage' useState.