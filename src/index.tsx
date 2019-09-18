import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import getLocation from './utils/getLocation'

import ImageContainer from './components/ImageSelector'
import RecommendResult from './components/RecommendResult'

import './index.less'
import '../node_modules/antd/dist/antd.min.css'

const Index = () => {
  let locationTag = '台北'
  useEffect(() => {
    const fetchData = async () => {
      locationTag = await getLocation()
    }
    fetchData()
  }, [])

  const localStorageTags = localStorage.getItem('tags') || '[]'
  const defaultTags = JSON.parse(localStorageTags)

  const [ isSearching, setIsSearching ] = useState<boolean>(false)
  const [ tags, setTags ] = useState<string[]>(defaultTags)
  const setUpdatedTags = (updatedTags: string[]) => {
    setTags([...updatedTags, locationTag])
    localStorage.setItem('tags', JSON.stringify(updatedTags))
  }

  return (
    <div>
      <div className='title'>DigOut</div>
      <ImageContainer setIsSearching={setIsSearching} setTags={setUpdatedTags}/>
      <RecommendResult isSearching={isSearching} setIsSearching={setIsSearching} selectedTags={tags} />
    </div>
  )
}

if (process.env.NODE_ENV === 'DEV') {
  render(<Index />, document.getElementById('root'))
}

export default hot(module)(Index)
