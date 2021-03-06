import { Icon, Button as AntdButton } from 'antd'
import { withStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { addIndex, equals, findIndex, flatten, isNil, length, map, reject, update, compose, none, filter, any, append, uniq, take, find } from 'ramda'
import React, { useState } from 'react'

import data from '../../static/food_merged_with_id.json'
import categories from '../../static/categories.json'

import './ImageSelector.less'

interface Item {
  id: string,
  worker: string,
  image_url: string,
  labels: string[]
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

const shuffle = (a: any) => {
  var j, x, i;
  for (i = a.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = a[i - 1];
      a[i - 1] = a[j];
      a[j] = x;
  }
  return a
}

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
    color: '#585858',
    margin: '5px',
    '&:hover': {
      backgroundColor: '#EA5704',
      color: '#fef1d2'
    }
  }
})(Button)

const OkButton = withStyles({
  root: {
    backgroundColor: '#f7ad00',
    color: '#fef1d2',
    margin: '5px',
    '&:hover': {
      backgroundColor: '#EA5704'
    }
  }
})(Button)

const ImageCard = ({index, item, handleClick}: ImageCardProps) => {

  const { image_url, id } = item

  return (
    <div onClick={() => handleClick(id)} style={{ width: '150px', height: '150px', margin: '0 16px 16px 0', textAlign: 'center', cursor: 'pointer'}}>
      <img src={image_url} style={{ display: 'block', width: '100%', height: '100%', backgroundSize: 'cover' }} />
    </div>
  )
}

const SelectedImageCard = ({ item, handleRemove }: SelectedImageCardProps) => {
  const { image_url, id } = item
  return (
    <div style={{ width: '150px', height: '150px', margin: '0 16px 16px 0', position: 'relative' }}>
      <img src={image_url} style={{ display: 'block', width: '100%', height: '100%', backgroundSize: 'cover' }} />
      <Icon
        onClick={() => handleRemove(id)}
        style={{
          backgroundColor: '#F4F4F4',
          borderRadius: '50%',
          padding: '5px',
          position: 'absolute',
          right: 0,
          top: 0
        }}
        type='close'
      />
    </div>
  )
}

const mapIndexed = addIndex<Item, React.ReactNode>(map)

interface ImageSelectorContainerProps {
  setIsSearching: (isSearching: boolean) => void,
  setTags: (tags: string[]) => void
}

export const ImageContainer = ({
  setIsSearching,
  setTags,
}: ImageSelectorContainerProps) => {
  const [ nineItems, setNineItems ] = useState<string[]>(getNineItems(data))
  const [ isTest, setIsTest ] = useState(false)

  const localStorageSelectedItems = localStorage.getItem('selectedItems') || '[]'
  const defaultSelectedItems = JSON.parse(localStorageSelectedItems)
  const [ selectedItems, setSelectedItems ] = useState<string[]>(defaultSelectedItems)
  const setUpdatedSelectedItems = (updatedSelectedItems: string[]) => {
    setSelectedItems(updatedSelectedItems)
    localStorage.setItem('selectedItems', JSON.stringify(updatedSelectedItems))
  }

  const localStorageAbandonedItems = localStorage.getItem('abandonedItems') || '[]'
  const defaultAbandonedItems = JSON.parse(localStorageAbandonedItems)
  const [ abandonedItems, setAbandonedItems ] = useState<string[]>(defaultAbandonedItems)
  const setUpdatedAbandonedItems = (updatedAbandonedItems: string[]) => {
    setAbandonedItems(updatedAbandonedItems)
    localStorage.setItem('abandonedItems', JSON.stringify(updatedAbandonedItems))
  }

  const handleClick = (item: string) => {
    if (length(selectedItems) === 3) {
      return
    }
    const updatedSelectedItems = append(item, selectedItems)
    setUpdatedSelectedItems(updatedSelectedItems)
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
    const updatedSelectedItems :string[]  = []
    setUpdatedSelectedItems(updatedSelectedItems)
    const updatedTags :string[]  = []
    setTags(updatedTags)
  }

  const handleSubmit = async () => {
    const rawLabels = flatten(map(image => image.labels, getItemsByIds(selectedItems)))
    const getSuggestedTags = compose<string[], string[], string[], string[]>(
      reject(isNil),
      uniq,
      map((label: string) => categories[label])
    )
    const suggestedTags = getSuggestedTags(rawLabels)
    const copySuggestedTags = take(9, suggestedTags)
    const randomSuggestedTags = shuffle(copySuggestedTags)
    const limitedSuggestedTags = take(3, randomSuggestedTags)
    const processTags = isTest ? limitedSuggestedTags : suggestedTags
    setIsSearching(true)
    setTags(processTags as any)
  }

  const handleRefresh = () => {
    const updatedAbandonedItems = [...abandonedItems, ...nineItems]
    setUpdatedAbandonedItems(updatedAbandonedItems)
    const newNimeItems = getNineItems(filter<Item>(item => none(equals(item.id), [...abandonedItems, ...nineItems, ...selectedItems]), data))
    setNineItems(newNimeItems)
  }

  const handleRemove = (item: string) => {
    setSelectedItems(reject(equals(item), selectedItems))
    const updatedAbandonedItems = append(item, abandonedItems)
    setUpdatedAbandonedItems(updatedAbandonedItems)
  }

  const hiddenCharacter = isTest ? '.' : ''

  return (
    <div>
      <div className="image-selector">
        <div style={{ display: 'inline-block', marginTop: 8 }}>
          <h3 style={{ color: '#f7ad00' }}>
            請在九宮格中選出偏好的食物圖片
            <CancelButton variant='contained' disabled={length(abandonedItems) === (250-12)} onClick={handleRefresh}>
              重整所有圖片
            </CancelButton>
          </h3>
          
        </div>
        <div className="image-list" style={{ display: 'flex', width: '660px', flexWrap: 'wrap' }}>
          {mapIndexed((item, index) => <ImageCard index={index} key={item.image_url} handleClick={handleClick} item={item}/>, getItemsByIds(nineItems))}
        </div>
      </div>
      <div>
        <h3 style={{ color: '#f7ad00' }}>選擇的圖片{hiddenCharacter}： {`${length(selectedItems)} / 3`}</h3>
        <div className="selected-image-list" style={{ display: 'flex', width: '660px', flexWrap: 'wrap' }}>
          {map((item: Item) => <SelectedImageCard key={item.image_url} item={item} handleRemove={handleRemove}/>, getItemsByIds(selectedItems))}
        </div>
        <CancelButton variant='contained' disabled={length(selectedItems) !== 3} onClick={handleSelectedItemsClear}>
          取消選取
        </CancelButton>
        <OkButton variant='contained' disabled={false} onClick={handleSubmit}>
          開始推薦
        </OkButton>
        <AntdButton onClick={() => setIsTest(!isTest)} style={{ opacity: 0 }}>t</AntdButton>
      </div>
    </div>
  )
}

export default ImageContainer
