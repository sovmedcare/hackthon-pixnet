import React from 'react'
import './ImageSelector.less'

const ImageSelector = () => {
  const handleClick = id => {
    console.log(id)
  }

  return <div className='image-selector'>
    <h3>請選出一張你喜歡的圖片</h3>
    <div className='image-list'>
      <div className='image-item left' 
        onClick={() => handleClick('leftId')}
      > 
        左圖
      </div>
      <div className='image-item right' 
        onClick={() => handleClick('rightId')}
      > 
        右圖
      </div>
    </div>  
  </div>
}

export default ImageSelector