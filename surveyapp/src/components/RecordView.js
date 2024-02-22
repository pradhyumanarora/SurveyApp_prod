import React, { useState, useEffect } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import VideoPreview from './VideoPreview';
import { useStopwatch } from 'react-timer-hook';
import { useGeolocated } from "react-geolocated";


const RecordView = props => {

  // const [recordedBlob, setRecordedBlob] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [deviceId, setDeviceId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [coordinatesArray, setCoordinatesArray] = useState([]);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    start,
    reset,
  } = useStopwatch({ autoStart: true });

  const { coords } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
      watchPosition: true,
    });

  const toggleCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'environment' ? 'user' : 'environment'
    );
    setDeviceId(null);
    console.log(facingMode);
    console.log(deviceId)
  };

  const constraints = {
    facingMode: facingMode, // 'user' for front camera, 'environment' for back camera
  };

  const onStop = () => {
    console.log('onStop called');
    console.log(hours, minutes, seconds);
    console.log(totalSeconds);
    setIsRecording(false);
    console.log(coordinatesArray);
    reset();
  }

  useEffect(() => {
    let intervalId;

    if (isRecording) {
      const coordinates = {
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      };

      setCoordinatesArray((prevArray) => [
        ...prevArray,
        { time: `${hours}:${minutes}:${seconds}`, coordinates },
      ]);
    }

    return () => clearInterval(intervalId);
  }, [seconds, isRecording]);


  return (
    <div>
      <ReactMediaRecorder
        video={constraints}
        render={({ status, startRecording, stopRecording, mediaBlobUrl, previewStream }) => (
          <div>
            <p>{status}</p>
            {status === 'stopped' && props.recordedBlob && (
              <div>
                <p>Recorded Video:</p>
                <video src={props.recordedBlob} width={300} height={300} controls />
              </div>
            )}
            {status !== 'stopped' && (
              <div>
                <div>
                  {status === 'idle' && (
                    <div>
                      <button onClick={() => { startRecording(); start(); setIsRecording(true); }}>Start Recording</button>
                      <button onClick={toggleCamera}>
                        Toggle Camera ({facingMode === 'environment'
                          ? 'Back'
                          : 'Front'})
                      </button>
                    </div>
                  )}
                  {status === 'recording' && (
                    <button onClick={() => { stopRecording(); props.setRecordedBlob(mediaBlobUrl); onStop(); }}>Stop Recording</button>
                  )}
                </div>
                <VideoPreview stream={previewStream} />
              </div>
            )}
            {status === 'stopped' && !props.recordedBlob && (
              <p>No recorded video available</p>
            )}
          </div>
        )}
        onStop={(blobUrl) => props.setRecordedBlob(blobUrl)}
        onGranted={({ video }) => setDeviceId(video.deviceId)}
      />
      {/* {!isRecording && coordinatesArray.length>0 && (
        <div>
          <p>Coordinates:</p>
          <ul>
            {coordinatesArray.map((coordinates, index) => (
              <li key={index}>
                {coordinates.time} - {coordinates.coordinates.latitude},{' '}
                {coordinates.coordinates.longitude}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default RecordView;
