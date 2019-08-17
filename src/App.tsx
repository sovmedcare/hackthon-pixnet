import * as React from 'react'

import './global.css'
import './App.css'

class App extends React.Component {
  public render() {
    return (
      <div className='container'>
        <img src='images/logo.svg' className='logo' alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='link'
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </div>
    )
  }
}

export default App
