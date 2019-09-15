import React, { useState } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

import ImageContainer from './components/ImageSelector'
import RecommendResult from './components/RecommendResult'

import './index.less'
import '../node_modules/antd/dist/antd.min.css'

const Index = () => {
  const localStorageTags = localStorage.getItem('tags') || '[]'
  const defaultTags = JSON.parse(localStorageTags)

  const [ isSearching, setIsSearching ] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>(defaultTags)
  const setUpdatedTags = (updatedTags: string[]) => {
    setTags(updatedTags)
    localStorage.setItem('tags', JSON.stringify(updatedTags))
  }

  return (
    <div>
      <h1>DigOut</h1>
      <ImageContainer setIsSearching={setIsSearching} setTags={setUpdatedTags}/>
      <RecommendResult isSearching={isSearching} setIsSearching={setIsSearching} selectedTags={tags} />
    </div>
  )
}

if (process.env.NODE_ENV === 'DEV') {
  render(<Index />, document.getElementById('root'))
}

export default hot(module)(Index)
