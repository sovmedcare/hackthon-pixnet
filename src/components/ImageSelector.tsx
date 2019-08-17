import React from "react"
import data from "../../static/food_merged.json"
import "./ImageSelector.less"

const ImageSelector = (props: {
  setSelectedLabels: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const { setSelectedLabels } = props

  const handleClick = (labels: string[]) => {
    setSelectedLabels(labels)
  }

  const getRandomIndex = () => Math.floor(Math.random() * data.length)

  const leftIndex = getRandomIndex()
  let rightIndex = getRandomIndex()
  while (rightIndex === leftIndex) {
    rightIndex = getRandomIndex()
  }

  return (
    <div className="image-selector">
      <h3>請在下面選出一張你喜歡的圖片</h3>
      <div className="image-list">
        <div
          className="image-item left"
          onClick={() => handleClick(data[leftIndex].labels)}
          style={{ backgroundImage: `url(${data[leftIndex].image_url})` }}
        />
        <div
          className="image-item right"
          onClick={() => handleClick(data[rightIndex].labels)}
          style={{ backgroundImage: `url(${data[rightIndex].image_url})` }}
        />
      </div>
    </div>
  )
}

export default ImageSelector
