import './App.css';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import RecordView from './components/RecordView';
import GeoLocation from './components/GeoLocation';
// import AddAsset from './components/addAsset/addAsset';
// import AddImages from './components/addImages/AddImages';
import axios from "axios";
import './components/addAsset/addAsset.css';


let divKey = 1;
function App() {
  const [inputValue, setInputValue] = useState("");


  // return (
  //   <>
  //     <div className="App">
  //       Hello World
  //     </div><h1>React Media Recorder App</h1>
  //     <RecordView />
  //     <GeoLocation />
  //     <Demo />
  //   </>
  // );
  const [inputType, toggleInputType] = useState('');
  const [file, setFile] = useState(null);
  const [divs, setDivs] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState('');
  const addAssetOnClick = () => {
    let assetValue = inputValue;
    if(/^\s*$/i.test(assetValue)){
        setInputValue("");
        return;
    }
    const handleAssetClick = e =>{
        console.log('key:',e.currentTarget.getAttribute('data-assetkey'));
        setSelectedAsset(e.currentTarget.getAttribute('data-assetkey'));
        console.log('usestate:',selectedAsset);
    }
    setDivs([...divs, {divId:divKey,
        content:(
        <div className='assetItem' data-assetkey={divKey} onClick={handleAssetClick}>
            <div className='assetItem1'>
                <div className='assetItem2' >{assetValue}</div>
                <div className='assetItem3'>x</div>
            </div>
        </div>
    ),
    imageUpload:(
        <div data-imagekey={divKey} style={{display:selectedAsset===`${divKey}`?'block':'none'}}>{selectedAsset} {divKey}</div>
    )}]);
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
    if (inputType == 'upload') {
      if (!file) {
        alert('No file found');
      } else {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        try {
          const response = await fetch("http://localhost:8080", {
            method: "POST",
            body: formData,
          });
    
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
        const data1 = {
          modelName: model,
          file: formData,
          inputType: inputType
        };
        // axios({
        //   method: 'post',
        //   url: 'http://localhost:8080/data',
        // // headers: {
        // //   'Content-Type': 'multipart/form-data'
        // // },
        //   data: {
        //     modelName:model,
        //     file:formData,
        //     inputType: inputType
        //   }
        // });
        // axios.post('http://localhost:8080/data', data1);
      }
    } else if (inputType == 'record') {
      alert('In Progress...');
    }

  }


  if (isMobile) {
    return (
      <div className='containerMobile'>

      </div>
    );
  }
  return (
    <>
      <div className='containerPC1'>
        <div className='assets'>
          {/* <AddAsset divs={divs} setDivs={setDivs} selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} /> */}
          {/*  */}
          <div className='assets1' >
            <div className='assets3'>
                <button className="giveTargetBtn" onClick={()=>setSelectedAsset('target')}>Give Target Input</button>
            </div>
            {/* <div className='assets2'> */}
                <div className='assetInput'>
                    <div className='assetInput1'>
                        <input type='text' className='assetInput2' value={inputValue} onChange={e=>setInputValue(e.target.value)} />
                    </div>
                    <div className='assetAddBtn'>
                        <button onClick={() => addAssetOnClick()}>Add</button>
                    </div>
                </div>
            {/* </div> */}
            {divs.map(div => div.content)}
        </div>
          {/*  */}
        </div>
        <div className='userInteraction'>
          <div className='containerPC' style={selectedAsset==="target"?{}:{display:"none"}}>
            <div className='item1PC'>
              <div className='inputs'>
                <div className='uploadFile'>
                  <button onClick={() => handleInputType('upload')}>Upload File</button>
                </div>
                <div className='recordVideo'>
                  <button onClick={() => handleInputType('record')}>Record Video</button>
                </div>
              </div>
            </div>
            <div className='item2PC'>
              <div className='item2PC2' >
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
                  <button onClick={() => sendData('detectron')}>Detect with Detectron</button>
                </div>
                <div className='GenAI'>
                  <button onClick={() => sendData('GenAI')}>Detect with GenAI</button>
                </div>
              </div>
            </div>
          </div>
          {/* <AddImages selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} /> */}
          {divs.map(div=>div.imageUpload)}
        </div>
      </div>

    </>

  );

}

{/* <div className='item1PC'>
<div className='inputs'>
  <div className='uploadFile'>
    <button onClick={()=>handleInputType('upload')}>Upload File</button>
  </div>
  <div className='recordVideo'>
  <button onClick={()=>handleInputType('record')}>Record Video</button>
  </div>
</div>
</div>
<div className='item2PC'>
<div className='item2PC2' >
  <div className='inputFile' style={inputType=='upload'?{}:{display:'none'}}>
    <input type='file' onChange={handleUpload}/>
  </div>
  <div className='videoRecorder' style={inputType=='record'?{}:{display:'none'}}>
    <div className='videoRecorder2'>
      <RecordView />
      <GeoLocation />
    </div>
  </div>
</div>
</div>
<div className='item3PC'>
<div className='trainBtns' style={inputType?{}:{display:'none'}}>
  <div className='detectron'>
    <button onClick={()=>sendData('detectron')}>Train with Detectron</button>
  </div>
  <div className='GenAI'>
    <button onClick={()=>sendData('GenAI')}>Train with GenAI</button>
  </div>
</div>
</div> */}


export default App;
