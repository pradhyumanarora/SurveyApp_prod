import React from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import VideoPreview from "./VideoPreview";
function Demo() {
    <ReactMediaRecorder
    video
    render={({ previewStream }) => {
      return <VideoPreview stream={previewStream} />;
    }}
  />
}
export default Demo;