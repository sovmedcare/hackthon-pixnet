import React, { useState } from 'react'

import './global.css'
import './App.css'

const App = () => {
  const a = useState('a')

  const handleA = async () => {
    await console.log(a)
  }

  return (
    <div className='container'>
      <img src='images/logo.svg' className='logo' alt="logo" />
      <button onClick={handleA}>
        Click handler test
      </button>
    </div>
  )
}

export default App
