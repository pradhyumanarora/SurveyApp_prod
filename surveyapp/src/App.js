import './App.css';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import RecordView from './components/RecordView';
import GeoLocation from './components/GeoLocation';
// import AddAsset from './components/addAsset/addAsset';
// import AddImages from './components/addImages/AddImages';
import axios from "axios";
// import './components/addAsset/addAsset.css';
// import AddImages2 from './components/addImages2/addImages2';
import AssetForm from './components/AssetForm/AssetForm';
import Loader from './components/Loader/Loader';


let divKey = 1;
function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputType, toggleInputType] = useState('');
  const [file, setFile] = useState(null);
  const [inputFiles, setInputFiles] = useState([])
  const [divs1, setDivs1] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('target');
  const [assets, setAssets] = useState([]);
  const [recordedBlob, setRecordedBlob] = useState(null);

  const addAssetOnClick = () => {
    let assetValue = inputValue;
    if (/^\s*$/i.test(assetValue)) {
      setInputValue("");
      return;
    }
    const handleAssetClick = e => {
      console.log('key:', e.currentTarget.getAttribute('data-assetkey'));
      setSelectedAsset(e.currentTarget.getAttribute('data-assetkey'));
      console.log('usestate:', selectedAsset);
    }
    setDivs1([...divs1, {
      divId: divKey,
      content: (
        <div className='assetItem' data-assetkey={divKey} onClick={handleAssetClick}>
          <div className='assetItem1'>
            <div className='assetItem2' >{assetValue}</div>
            <div className='assetItem3'>x</div>
          </div>
        </div>
      ),
      imageUpload: (
        <div data-imagekey={divKey} style={{ display: selectedAsset === `${divKey}` ? 'block' : 'none' }}>{selectedAsset} {divKey}</div>
      )
    }]);
    setInputValue("");
    divKey++;
  }
  // const [divKey,setDivKey] = useState(0);
  // const [imagesDiv, setImagesDiv] = useState([]);
  const handleInputType = (val) => {
    toggleInputType(val);
  };
  const handleUpload = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };



  const sendData = async (model) => {
    // const url = "https://surveyapp-pnq3.onrender.com/data";
    const url = "http://127.0.0.1:5000/upload";
    if (assets) {
      const formData = new FormData();
      // formData.append('modelName','genAI');
      assets.forEach((asset, index) => {
        formData.append(`assets[${index}].name`, asset.name);
        formData.append(`assets[${index}].image`, asset.image);
      });
      try {
        const response = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // setResultImage(data.image);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // setLoading(false);
      }
    }
    else if(recordedBlob){
      const targetFile = new File([recordedBlob], "target.mp4", { type: 'video/mp4' });
      const formDataVid = new FormData();
      formDataVid.append('target', targetFile);
      try {
        const response = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // setResultImage(data.image);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        // setLoading(false);
      }
    }
  }
  return (
    <>
      <div className='containerPC1'>
        <div className='userInteraction'>
          <div className='containerPC'>
            <div className='item1PC'>
              <div className='inputs'>
                <div className='addAsset'>
                  <button className='Btn' onClick={() => handleInputType('addAsset')}>Add Asset</button>
                </div>
                <div className='uploadFile'>
                  <button className='Btn' onClick={() => handleInputType('upload')}>Upload File</button>
                </div>
                <div className='recordVideo'>
                  <button className='Btn' onClick={() => handleInputType('record')}>Record Video</button>
                </div>
              </div>
            </div>
            <div className='item2PC'>
              <div className='item2PC2' >

                <div className='assetsUploadOption' style={inputType == 'addAsset' ? {} : { display: 'none' }}>
                  <AssetForm assets={assets} setAssets={setAssets} />
                </div>

                <div className='inputFile' style={inputType == 'upload' ? {} : { display: 'none' }}>
                  <input type='file' onChange={handleUpload} />
                </div>

                <div className='videoRecorder' style={inputType == 'record' ? {} : { display: 'none' }}>
                  <div className='videoRecorder2'>
                    <RecordView recordedBlob={recordedBlob} setRecordedBlob={setRecordedBlob}/>
                    <GeoLocation />
                  </div>
                </div>
              </div>
            </div>
            <div className='item3PC'>
              <div className='trainBtns' style={inputType ? {} : { display: 'none' }}>
                <div className='detectron'>
                  <button className='Btn' onClick={() => sendData('detectron')}>Detect with Detectron</button>
                </div>
                <div className='GenAI'>
                  <button className='Btn' onClick={() => sendData('GenAI')}>Detect with GenAI</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  );

}


export default App;