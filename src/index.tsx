import React, { useState } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import ImageSelector from './components/ImageSelector'
import RecommendResult from './components/RecommendResult'

import './index.less'
import '../node_modules/antd/dist/antd.min.css'

const Index = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  return (
    <div>
      <h1>食字路口</h1>
      <ImageSelector setSelectedLabels={setSelectedLabels} />
      <RecommendResult selectedLabels={selectedLabels} />
    </div>
  )
}

render(<Index />, document.getElementById('root'))
export default hot(module)(Index)
