import React from 'react'
import { render } from 'react-dom'
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

render(<Index />, document.getElementById('root'))
export default hot(module)(Index)