import { Button } from 'antd'
import { equals, findIndex, flatten, isNil, length, map, reject, update, without } from 'ramda'
import React, { useState } from 'react'

import data from '../../static/food_merged.json'
import categories from '../../static/categories.json'
import { getTagsByLabel } from '../getTagsByLabel'
import { getRandomItem } from '../index'

import './ImageSelector.less'

interface Item {
  worker: string,
  image_url: string,
  labels: string[]
}
interface ImageSelectorContainerProps {
  items: Item[],
  setItems: React.Dispatch<React.SetStateAction<Item[]>>,
  setTags: (tags: string[]) => void
}

interface ImageCardProps {
  item: Item,
  handleClick: (item: Item) => void
}

interface SelectedImageCardProps {
  item: Item,
}

const ImageCard = ({item, handleClick}: ImageCardProps) => {

  const { image_url } = item

  return (
    <div onClick={() => handleClick(item)} style={{ width: '120px', marginTop: '20px' }}>
      <img src={image_url} style={{ display: 'bloack', maxWidth: 100, maxHeight: 100, backgroundSize: 'cover' }} />
    </div>
  )
}

const SelectedImageCard = ({item}: SelectedImageCardProps) => {
  const { image_url } = item
  return (
    <div style={{ width: '120px', marginTop: '20px' }}>
      <img src={image_url} style={{ display: 'bloack', maxWidth: 100, maxHeight: 100, backgroundSize: 'cover' }} />
    </div>
  )
}

export const ImageContainer = ({
  items,
  setItems,
  setTags
}: ImageSelectorContainerProps) => {
  const [ selectedImages, setSelectedImages ] = useState<Item[]>([])

  const handleClick = (item: Item) => {
    if (length(selectedImages) === 3) {
      return
    }
    setSelectedImages(state => [...state, item])
    setItems(state => {
      const orginItems = state
      const newItem = getRandomItem(without([...orginItems, ...selectedImages], data))
      const replaceItemIndex = findIndex(equals(item), orginItems)
      const newNineItems = update(replaceItemIndex, newItem, orginItems)
      return newNineItems
    })
  }

  const handleSubmit = async () => {
    const rawLabels = flatten(map(image => image.labels, selectedImages))
    console.log(`rawLabels`, rawLabels);
    const pixnetTagsList: string[][] = await Promise.all(
      map(label => getTagsByLabel(label), rawLabels)
    )
    const pixnetTags = reject(isNil, flatten(pixnetTagsList))
    const suggestedTags = reject(isNil, map(pixnetTag => categories[pixnetTag], pixnetTags))

    setTags(suggestedTags)
  }

  const handleRefresh = () => {
    setSelectedImages([])
  }


  return (
    <div className="image-selector">
      <h3>請在下面選出一張你喜歡的圖片</h3>
      <div className="image-list" style={{ display: 'flex', width: '360px', flexWrap: 'wrap' }}>
        {map((item: Item) => <ImageCard key={item.image_url} handleClick={handleClick} item={item}/>, items)}
      </div>
      <h3>你喜歡的圖片 {`${length(selectedImages)} / 3`}</h3>
      <div className="selected-image-list" style={{ display: 'flex', width: '360px', flexWrap: 'wrap' }}>
        {map((item: Item) => <SelectedImageCard key={item.image_url} item={item}/>, selectedImages)}
      </div>
      <Button type='primary' disabled={length(selectedImages) !== 3} onClick={handleSubmit}>
        開始推薦文章
      </Button>
      <Button type='default' style={{ marginLeft: '10px' }} disabled={length(selectedImages) !== 3} onClick={handleRefresh}>
        重新選擇
      </Button>
    </div>
  )
}

export default ImageContainer
