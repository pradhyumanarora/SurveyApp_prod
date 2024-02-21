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


let divKey = 1;
function App() {
  const [inputValue, setInputValue] = useState("");
  const [inputType, toggleInputType] = useState('');
  const [file, setFile] = useState(null);
  const [inputFiles, setInputFiles] = useState([])
  const [divs1, setDivs1] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('target');
  const [assets, setAssets] = useState([]);
  const [resultImage, setResultImage] = useState(null);



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
    // const url = "http://localhost:8080/upload";
    const formData = new FormData();
    formData.append("targetImage", file);
    assets.forEach((asset, index) => {
      // formData.append(`assets${index + 1}.name`, asset.name);
      console.log(asset);
      formData.append(`assetsImg${index + 1}`, asset.image);
    });


    try {
      const response = await fetch("https://surveyapp-prod-flask.onrender.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming the backend returns the base64-encoded image in 'image' field
      setResultImage(data.image);
      console.log("Image Updated");
    } catch (error) {
      console.error("Error:", error);
    } 
  }

  return (
    <>
      <div className='containerPC1'>

        {/* <div className='assets'> */}
        {/* <AddAsset divs1={divs1} setDivs1={setDivs1} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} /> */}
        {/* <div className='assets1' >
            <div className='assets3'>
              <button className="giveTargetBtn" onClick={() => { }}>Give Target Input</button>
            </div> */}
        {/* <div className='assets2'> */}
        {/* <div className='assetInput'>
              <div className='assetInput1'>
                <input type='text' className='assetInput2' value={inputValue} onChange={e => setInputValue(e.target.value)} />
              </div>
              <div className='assetAddBtn'>
                <button onClick={addAssetOnClick}>Add</button>
              </div>
            </div> */}
        {/* </div> */}
        {/* {divs1.map(div => div.content)} */}
        {/* </div>
        </div> */}

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
                  {/* <AddImages2 inputFiles={inputFiles} setInputFiles={setInputFiles}/> */}
                  {/* <div>Number of Files Received: {inputFiles.length}</div> */}
                  <AssetForm assets={assets} setAssets={setAssets} />
                </div>

                <div className='inputFile' style={inputType == 'upload' ? {} : { display: 'none' }}>
                  <input type='file' onChange={handleUpload} />
                </div>

                <div className='videoRecorder' style={inputType == 'record' ? {} : { display: 'none' }}>
                  <div className='videoRecorder2'>
                    <RecordView />
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
          {/* <AddImages inputFiles={inputFiles} setInputFiles={setInputFiles} /> */}
          {/* {divs1.map(div=>div.imageUpload)} */}
        </div>
      </div>
      {resultImage && (
        <div className="mt-4">
          <h2>Result Image</h2>
          <img src={resultImage} alt="Result" className="img-fluid" />
        </div>
      )}
    </>

  );

}

export default App;
