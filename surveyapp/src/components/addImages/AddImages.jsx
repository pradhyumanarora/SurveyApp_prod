import React from 'react';
import './AddImages.css';

const AddImages = props => {
  const handleInputFile = e =>{
    props.setInputFiles([...props.inputFiles,e.target.files[0]]);
  }
  return (
    <>
      <div className='inputContainer'>
        <div className='imageInputHeading'>Add Asset Images Below:</div>
        <div className='imageInput'>
          <input type="file" onChange={handleInputFile}/>
        </div>
        <div className='imageInput'>
          <input type="file" onChange={handleInputFile} />
        </div>
        <div className='imageInput'>
          <input type="file" onChange={handleInputFile} />
        </div>
        <div className='imageInput'>
          <input type="file" onChange={handleInputFile} />
        </div>
        <div className='imageInput'>
          <input type="file" onChange={handleInputFile} />
        </div>
      </div>
    </>
  )
}

export default AddImages