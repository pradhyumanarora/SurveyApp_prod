import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import './AssetForm.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
// import crypto from 'crypto';

let assetId = 0;
const AssetForm = props => {
  

  const addAsset = () => {
    props.setAssets([...props.assets, { id:window.crypto.randomUUID(), name: '', image: null }]);
  };

  const removeAsset = (index) => {
    const newAssets = [...props.assets];
    newAssets.splice(index, 1);
    props.setAssets(newAssets);
  };

  const handleNameChange = (e, id) => {
    const newAssets = [...props.assets];
    let index = newAssets.findIndex(asset=>{
      return asset.id==id;
    })
    newAssets[index].name = e.target.value;
    props.setAssets(newAssets);
  };

  const handleImageUpload = (e, id) => {
    const newAssets = [...props.assets];

    let index = newAssets.findIndex(asset=>{
      return asset.id==id;
    })
    newAssets[index].image = e.target.files[0];
    props.setAssets(newAssets);
  };

  return (
    <div className='uploadArea'>
      {props.assets.map((asset, index) => (
        <div key={asset.id}>
          <input
            type="text"
            placeholder="Enter asset name"
            value={asset.name}
            onChange={(e) => handleNameChange(e, asset.id)}
          />
          <div className='uploadArea1'>
            <div className='uploadArea2'>
                <div className='uploadArea3'>
                <label for={'uploadImg1'+asset.id} >
                    <FaCloudUploadAlt className='uploadIcon'/>
                </label>
                <input
                    id={'uploadImg1'+asset.id}
                    className={'upload'+index}
                    type="file"
                    onChange={(e) => handleImageUpload(e, asset.id)}
                    style={{display:'none'}}
                />
                
                </div>
                {asset.image && <div>File uploaded</div>}
            </div>
          </div>
          
          <div className='removeBtn'>
            <div className='removeBtn1'>
                <IoIosCloseCircleOutline onClick={() => removeAsset(index)} className='removeBtn2'/>
            </div>
          </div>
           
        </div>
      ))}
      <div className='addNewAsset'>
        <CiCirclePlus onClick={addAsset} className='addNewAsset1'/>
      </div>
    </div>
  );
};

export default AssetForm;
