import React from 'react'
import { Table } from 'antd'
import './RecommendResult.less'

const columns = [
  {
    title: '縮圖',
    dataIndex: 'thumbnail',
    key: 'thumbnail'
  },
  {
    title: '標題',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '關鍵字',
    dataIndex: 'keyword',
    key: 'keyword'
  }
]

const RecommendResult = () => {
  const dataSource = []

  return <div className='recommend-result'>
    <h3>最適合你的是...</h3>
    <Table dataSource={dataSource} columns={columns} />
  </div>
}

export default RecommendResult