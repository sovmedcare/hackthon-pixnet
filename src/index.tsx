import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import ImageSelector from './components/ImageSelector'
import RecommendResult from './components/RecommendResult'

const Index = () => {
  return <div>
    <ImageSelector />
    <RecommendResult />
  </div>
}

render(<Index />, document.getElementById('root'))

export default hot(module)(Index)