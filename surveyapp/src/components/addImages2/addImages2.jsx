import React from 'react'
import './addImages2.css';
import { FaCloudUploadAlt } from "react-icons/fa";

const AddImages2 = props => {

  return (
    <>
        <div className='uploadArea'>
            <div className='uploadImg'>
                <label for='uploadImg1' >
                    <FaCloudUploadAlt className='uploadIcon'/>
                </label>
                <input type='file' id='uploadImg1' multiple style={{display:'none'}} onChange={e=>{
                    props.setInputFiles([...props.inputFiles,...e.target.files]);
                }}/>
            </div>
            <div style={{visibility:props.inputFiles.length?'':'hidden'}}>
                Files Uploaded
            </div>
        </div>
    </>
  )
}

export default AddImages2;