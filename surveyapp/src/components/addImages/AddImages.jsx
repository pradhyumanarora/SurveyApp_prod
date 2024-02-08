import React from 'react';
import './AddImages.css';

const AddImages = () => {
  return (
    <>
      <div className='inputContainer'>
        <div className='imageInput'>
          <input type="file" />
        </div>
        <div className='imageInput'>
          <input type="file" />
        </div>
        <div className='imageInput'>
          <input type="file" />
        </div>
        <div className='imageInput'>
          <input type="file" />
        </div>
        <div className='imageInput'>
          <input type="file" />
        </div>
      </div>
    </>
  )
}

export default AddImages