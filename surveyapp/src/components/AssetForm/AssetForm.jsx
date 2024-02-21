import React, { useState } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import './AssetForm.css';
import { FaCloudUploadAlt } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AssetForm = props => {
  

  const addAsset = () => {
    props.setAssets([...props.assets, { name: '', image: null }]);
  };

  const removeAsset = (index) => {
    const newAssets = [...props.assets];
    newAssets.splice(index, 1);
    props.setAssets(newAssets);
  };

  const handleNameChange = (e, index) => {
    const newAssets = [...props.assets];
    newAssets[index].name = e.target.value;
    props.setAssets(newAssets);
  };

  const handleImageUpload = (e, index) => {
    const newAssets = [...props.assets];
    newAssets[index].image = e.target.files[0];
    props.setAssets(newAssets);
  };

  return (
    <div className='uploadArea'>
      {props.assets.map((asset, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter asset name"
            value={asset.name}
            onChange={(e) => handleNameChange(e, index)}
          />
          <div className='uploadArea1'>
            <div className='uploadArea2'>
                <div className='uploadArea3'>
                <label for='uploadImg1' >
                    <FaCloudUploadAlt className='uploadIcon'/>
                </label>
                <input
                    id='uploadImg1'
                    type="file"
                    onChange={(e) => handleImageUpload(e, index)}
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
