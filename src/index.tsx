import React, { useState } from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import ImageContainer from './components/ImageSelector'
import RecommendResult from './components/RecommendResult'

import './index.less'
import '../node_modules/antd/dist/antd.min.css'

const Index = () => {
  const [tags, setTags] = useState<string[]>([])
  return (
    <div>
      <h1>食字路口</h1>
      <ImageContainer  setTags={setTags}/>
      <RecommendResult selectedLabels={tags} />
    </div>
  )
}

if (process.env.NODE_ENV === 'DEV') {
  render(<Index />, document.getElementById('root'))
}

export default hot(module)(Index)
