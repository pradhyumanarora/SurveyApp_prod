# Frontend Survey App

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Step-By-Step Guide


1. First initialize the node packages:
    ```shell
    run npm i
    ```
    
2. To start React server run:
    ```shell
    npm start
    ```
    
3. Click on 'Add Assets' button to add asset image and asset names. Asset details are stored as follows:
    ```javascript
    [
        {id: string, name: string, image: file},
        {id: string, name: string, image: file},
        {id: string, name: string, image: file},
    ]
    ```

4. Click on 'Upload File' button to upload target image

5. 'Record Video' button is used to record video and get geolocation in real-time. The module uses ReactMediaRecorder for recording video and useGeolocated libraries for recording and detecting geolcation simultaneously.

    ReactMediaRecorder can be imported like this:
    ```javascript
    import { ReactMediaRecorder } from 'react-media-recorder'
    ```

    For importing useGeolocated use the following command:
    ```javascript
    import { useGeolocated } from "react-geolocated"
    ```

6. When the recording begins, the camera preview is not visible by default. That can be done importing the following component:
    ```javascript
    import VideoPreview from './VideoPreview'
    ```
    It ensures that camera preview is enabled while recording.
    
    The following function takes care of the camera preview during recording:
    ```javascript
    const VideoPreview = ({ stream }) => {
      const videoRef = useRef(null);
    
      useEffect(() => {
        if (videoRef.current && stream) {
          videoRef.current.srcObject = stream;
        }
      }, [stream]);
    
      if (!stream) {
        return null;
      }
    
      return <video ref={videoRef} width={<width>} height={<height>} autoPlay controls />;
    };
    ```
    You can adjust the dimensions of the camera preview by adjusting the height and widht parameters.

7. To toggle the front and back camera, create a button and call the below given function when the button is pressed:
    ```javascript
    const toggleCamera = () => {
        setFacingMode((prevFacingMode) =>
          prevFacingMode === 'environment' ? 'user' : 'environment'
        );
        setDeviceId(null);
      };
    ```


**Detecting Objects:**
Below the input fields, 2 buttons are there, 'Detect with detectron' and 'Detect with OWLViT'. The buttons call the function ```sendData()```. ```sendData()``` accepts 1 parameter: 'model' which is the name of the model, **'Detectron'** or **'OWL-ViT'**.

If the target image is provided, then target image is added to FormData object and then assets are appended to FormData object.
Else if recorded video is provided then recordedBlob is converted to mp4 format and stored in 'targetFile' variable. Then 'targetFile' and assets are appended to FormData object.