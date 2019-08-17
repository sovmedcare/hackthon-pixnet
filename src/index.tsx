import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'

const Index = () => {
  return <div>
    hellp my app
  </div>
}

render(<Index />, document.getElementById('root'))

export default hot(module)(Index)