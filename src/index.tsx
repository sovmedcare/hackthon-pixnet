import React, { useState } from "react"
import { hot } from "react-hot-loader"
import ImageSelector from "./components/ImageSelector"
import RecommendResult from "./components/RecommendResult"
import "./index.less"

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

export default hot(module)(Index)
