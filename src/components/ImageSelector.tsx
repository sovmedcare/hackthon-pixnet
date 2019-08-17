import React from 'react'
import './ImageSelector.less'

const ImageSelector = () => {
  const handleClick = (id: any) => {
    alert(id)
  }

  return <div className='image-selector'>
    <h3>請在下面選出一張你喜歡的圖片</h3>
    <div className='image-list'>
      <div className='image-item left' 
        onClick={() => handleClick('leftId')}
        style={{ backgroundImage: `url(https://picsum.photos/150/150)` }}
      > 
        左圖
      </div>
      <div className='image-item right' 
        onClick={() => handleClick('rightId')}
        style={{ backgroundImage: `url(https://picsum.photos/150/151)` }}
      > 
        右圖
      </div>
    </div>  
  </div>
}

export default ImageSelector