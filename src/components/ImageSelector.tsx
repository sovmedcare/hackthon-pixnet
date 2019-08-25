import { Button, Icon } from 'antd'
import { equals, findIndex, flatten, isNil, length, map, reject, update, concat, none, filter, any, append } from 'ramda'
import React, { useState } from 'react'

import data from '../../static/food_merged_with_id.json'
import categories from '../../static/categories.json'
import { getTagsByLabel } from '../getTagsByLabel'

import './ImageSelector.less'

interface Item {
  id: string,
  worker: string,
  image_url: string,
  labels: string[]
}
interface ImageSelectorContainerProps {
  setTags: (tags: string[]) => void
}

interface ImageCardProps {
  item: Item,
  handleClick: (item: string) => void
}

interface SelectedImageCardProps {
  item: Item,
  handleRemove: (item: string) => void
}

const getItemsByIds = (ids: string[]): Item[] => filter<Item>((item) => any(equals(item.id), ids), data)

export const getRandomItem = (data: any) => data[Math.floor(Math.random() * data.length)].id

export const getNineItems = (data: any) => {
  let arr = []
  while (arr.length !== 9 ) {
    let item = getRandomItem(data)
    if (!any(equals(item), arr)) {
      arr.push(item)
    }
  }
  return arr
}

const ImageCard = ({item, handleClick}: ImageCardProps) => {

  const { image_url, id } = item

  return (
    <div onClick={() => handleClick(id)} style={{ width: '120px', marginTop: '20px' }}>
      <img src={image_url} style={{ display: 'bloack', maxWidth: 100, maxHeight: 100, backgroundSize: 'cover' }} />
    </div>
  )
}

const SelectedImageCard = ({ item, handleRemove }: SelectedImageCardProps) => {
  const { image_url, id } = item
  return (
    <div style={{ width: '130px', marginTop: '20px', position: 'relative', padding: '15px' }}>
      <img src={image_url} style={{ display: 'bloack', maxWidth: 100, maxHeight: 100, backgroundSize: 'cover' }} />
      <Icon type="close" onClick={() => handleRemove(id)} style={{position: 'absolute', top: 0, right: 0 }} />
    </div>
  )
}

export const ImageContainer = ({
  setTags
}: ImageSelectorContainerProps) => {
  const [ nineItems, setNineItems ] = useState<string[]>(getNineItems(data))
  const [ selectedItems, setSelectedItems ] = useState<string[]>([])
  const [ abandonedItems, setAbandonedItems ] = useState<string[]>([])

  const handleClick = (item: string) => {
    if (length(selectedItems) === 3) {
      return
    }
    setSelectedItems(append(item, selectedItems))
    setNineItems(state => {
      const orginItems = state
      const filteredData = filter((data: Item) => none(equals(data.id), [...nineItems, ...selectedItems, ...abandonedItems]), data)
      const newItem = getRandomItem(filteredData)
      const replaceItemIndex = findIndex(equals(item), orginItems)
      const newNineItems = update(replaceItemIndex, newItem, orginItems)
      return newNineItems
    })
  }

  const handleSubmit = async () => {
    const rawLabels = flatten(map(image => image.labels, getItemsByIds(selectedItems)))
    const pixnetTagsList: string[][] = await Promise.all(
      map(label => getTagsByLabel(label), rawLabels)
      )
    const pixnetTags = reject(isNil, flatten(pixnetTagsList))
    const suggestedTags = reject(isNil, map(pixnetTag => categories[pixnetTag], pixnetTags))

    setTags(suggestedTags)
  }

  const handleRefresh = () => {
    setAbandonedItems([...abandonedItems, ...nineItems])
    const newNimeItems = getNineItems(filter<Item>(item => none(equals(item.id), [...abandonedItems, ...nineItems, ...selectedItems]), data))
    setNineItems(newNimeItems)
  }

  const handleRemove = (item: string) => {
    setSelectedItems(reject(equals(item), selectedItems))
    setAbandonedItems(append(item, abandonedItems))
  }


  return (
    <div className="image-selector">
      <h3>請在下面選出一張你喜歡的圖片</h3>
      <Button type='default' style={{ marginLeft: '10px' }} disabled={length(abandonedItems) === (250-12)} onClick={handleRefresh}>
        重整所有圖片
      </Button>
      <div className="image-list" style={{ display: 'flex', width: '360px', flexWrap: 'wrap' }}>
        {map((item: Item) => <ImageCard key={item.image_url} handleClick={handleClick} item={item}/>, getItemsByIds(nineItems))}
      </div>
      <h3>你喜歡的圖片 {`${length(selectedItems)} / 3`}</h3>
      <div className="selected-image-list" style={{ display: 'flex', width: '390px', flexWrap: 'wrap' }}>
        {map((item: Item) => <SelectedImageCard key={item.image_url} item={item} handleRemove={handleRemove}/>, getItemsByIds(selectedItems))}
      </div>
      <Button type='primary' disabled={length(selectedItems) !== 3} onClick={handleSubmit}>
        開始推薦文章
      </Button>
    </div>
  )
}

export default ImageContainer
