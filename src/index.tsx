import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader'
import App from './App'

render(<App />, document.getElementById('root'))

export default hot(module)(App)