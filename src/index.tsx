import React, { useState } from 'react'
import { render } from 'react-dom'
import { find, equals } from 'ramda'
import { hot } from 'react-hot-loader'
import ImageContainer from './components/ImageSelector'
import data from "../static/food_merged.json"
import RecommendResult from './components/RecommendResult'

import './index.less'
import '../node_modules/antd/dist/antd.min.css'

export const getRandomItem = (data: any) => data[Math.floor(Math.random() * data.length)]

const getNineItems = (data: any) => {
  let arr = []
  while (arr.length !== 9 ) {
    let item = getRandomItem(data)
    if (!find(equals(item), arr)) {
      arr.push(item)
    }
  }
  return arr
}

const Index = () => {

  const [items, setItems] = useState(getNineItems(data))
  const [tags, setTags] = useState<string[]>([])
  return (
    <div>
      <h1>食字路口</h1>
      <ImageContainer items={items} setItems={setItems} setTags={setTags}/>
      <RecommendResult selectedLabels={tags} />
    </div>
  )
}

if (process.env.NODE_ENV === 'DEV') {
  render(<Index />, document.getElementById('root'))
}

export default hot(module)(Index)
