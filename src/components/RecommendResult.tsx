import { Table, Tag } from 'antd'
import { compose, join, length, map } from 'ramda'
import React, { useEffect, useState } from 'react'
import qs from 'qs'

import './RecommendResult.less'

const columns = [
  {
    title: "縮圖",
    dataIndex: "thumbnail",
    key: "thumbnail",
    // @ts-ignore
    render: (text, record) => {
      return <img className='result-thumbnail' src={text} />
    }
  },
  {
    title: "標題",
    dataIndex: "title",
    key: "title",
    // @ts-ignore
    render: (text, record) => {
      return (
        <a href={record.link}>{record.title}</a>
      )
    }
  },
  {
    title: "關鍵字",
    dataIndex: "keyword",
    key: "keyword",
    // @ts-ignore
    render: (text, record) => {
      return (
        <>
          {map(
            keyword => (<div key={keyword}>{keyword}</div>)
          , record.keywords)}
        </>
      )
    }
  }
]

const apiURL = 'https://emma.pixnet.cc/blog/articles/search'
const defaultQuery = {
  format: 'json',
  type: 'keyword',
  /** id 26 代表美味食記這個分類
   * 參考: https://developer.pixnet.pro/#!/doc/pixnetApi/blogSiteCategoriesArticle
   */
  site_category_id: 26
}

interface Data {
  keywords: string[],
  link: string,
  thumbnail: string,
  title: string
}

const RecommendResult = (props: { selectedLabels: string[] }) => {
  const { selectedLabels } = props
  const [isTouched, setIsTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataSource, setDataSource] = useState<Data[]>([])

  const getArticles = async () => {
    const defaultQueryString = qs.stringify(defaultQuery)
    const keyQuery = compose(
      join('&'),
      map(label => `key[]=${label}`)
    )(selectedLabels)
    const query = `${defaultQueryString}&${keyQuery}`

    const response = await fetch(`${apiURL}?${query}`)
    const json = await response.json()

    if (!json || json.total === 0) {
      setDataSource([])
    } else {
      const result = map(article => ({
        link: article && article.link,
        thumbnail: article && article.thumb,
        title: article && article.title,
        keywords: article && article.tags && map(tagInfo => tagInfo && tagInfo.tag, article.tags)
      }), json.articles)
      setDataSource(result)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (selectedLabels && length(selectedLabels) > 0) {
      setLoading(true)
      setIsTouched(true)
      getArticles()
    }
  }, [selectedLabels])

  return (
      <div className="recommend-result">
        {map(label => (
          <Tag key={label}>{label}</Tag>
        ), selectedLabels)}
        { isTouched && (
            <>
              <h3>最適合你的是...</h3>
              <Table columns={columns}  dataSource={dataSource} loading={loading} />
            </>
          )
        }
      </div>
  )
}

export default RecommendResult
