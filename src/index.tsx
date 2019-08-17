import React from 'react'
import { hot } from 'react-hot-loader'
import ImageSelector from './components/ImageSelector'
import RecommendResult from './components/RecommendResult'
import './index.less'

const Index = () => {
  return <div>
    <h1>食字路口</h1>
    <ImageSelector />
    <RecommendResult />
  </div>
}

export default hot(module)(Index)