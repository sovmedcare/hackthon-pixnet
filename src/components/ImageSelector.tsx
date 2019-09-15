import { Icon } from 'antd'
import Button from '@material-ui/core/Button'
import { addIndex, equals, findIndex, flatten, isNil, length, map, reject, update, compose, none, filter, any, append, uniq } from 'ramda'
import React, { useState } from 'react'

import data from '../../static/food_merged_with_id.json'
import categories from '../../static/categories.json'

import './ImageSelector.less'
import { withStyles } from '@material-ui/core';

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
  index: number,
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

const CancelButton = withStyles({
  root: {
    backgroundColor: '#fef1d2',
    margin: '5px'
  }
})(Button)

const OkButton = withStyles({
  root: {
    backgroundColor: '#f7ad00',
    color: '#fef1d2',
    margin: '5px'
  }
})(Button)

const ImageCard = ({index, item, handleClick}: ImageCardProps) => {

  const { image_url, id } = item

  return (
    <div onClick={() => handleClick(id)} style={{ width: '220px', height: '220px', padding: '10px', textAlign: 'center' }}>
      <img src={image_url} style={{ display: 'block', width: '100%', height: '100%', backgroundSize: 'cover' }} />
    </div>
  )
}

const SelectedImageCard = ({ item, handleRemove }: SelectedImageCardProps) => {
  const { image_url, id } = item
  return (
    <div style={{ width: '220px', height: '220px', padding: '10px', position: 'relative' }}>
      <img src={image_url} style={{ display: 'block', width: '100%', height: '100%', backgroundSize: 'cover' }} />
      <Icon type="close" onClick={() => handleRemove(id)} style={{position: 'absolute', top: 0, right: 0 }} />
    </div>
  )
}

const mapIndexed = addIndex<Item, React.ReactNode>(map)

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

  const handleSelectedItemsClear = () => {
    setSelectedItems([])
  }

  const handleSubmit = async () => {
    const rawLabels = flatten(map(image => image.labels, getItemsByIds(selectedItems)))
    const getSuggestedTags = compose<string[], string[], string[], string[]>(
      reject(isNil),
      uniq,
      map((label: string) => categories[label])
    )
    const suggestedTags = getSuggestedTags(rawLabels)

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
    <div>
      <div className="image-selector">
        <h3 style={{ color: '#f7ad00' }}>請在下面選出三張你喜歡的圖片</h3>
        <CancelButton variant='contained' style={{ marginLeft: '10px' }} disabled={length(abandonedItems) === (250-12)} onClick={handleRefresh}>
          重整所有圖片
        </CancelButton>
        <div className="image-list" style={{ display: 'flex', width: '660px', flexWrap: 'wrap' }}>
          {mapIndexed((item, index) => <ImageCard index={index} key={item.image_url} handleClick={handleClick} item={item}/>, getItemsByIds(nineItems))}
        </div>
      </div>
      <div>
        <h3 style={{ color: '#f7ad00' }}>選取的照片 {`${length(selectedItems)} / 3`}</h3>
        <div className="selected-image-list" style={{ display: 'flex', width: '660px', flexWrap: 'wrap' }}>
          {map((item: Item) => <SelectedImageCard key={item.image_url} item={item} handleRemove={handleRemove}/>, getItemsByIds(selectedItems))}
        </div>
        <OkButton variant='contained' disabled={length(selectedItems) !== 3} onClick={handleSubmit}>
          開始推薦
        </OkButton>
        <CancelButton variant='contained' disabled={length(selectedItems) !== 3} onClick={handleSelectedItemsClear}>
          清除已選擇
        </CancelButton>
      </div>
    </div>
  )
}

export default ImageContainer
