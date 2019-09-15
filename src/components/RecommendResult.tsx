import { Button, Table, Tag } from 'antd'
import { compose, equals, join, length, map } from 'ramda'
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
      const url = record.link
      const handleCurrentTabLink = () => {
        chrome.tabs.update({ url })
      }

      return (
        <a onClick={handleCurrentTabLink}>{record.title}</a>
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

interface RecommendResultProps {
  isSearching: boolean,
  selectedTags: string[],
  setIsSearching: (isSearching: boolean) => void
}

const RecommendResult = (props: RecommendResultProps) => {
  const { isSearching, selectedTags, setIsSearching } = props
  const [loading, setLoading] = useState(false)
  
  const localStorageRecommendedResult = localStorage.getItem('recommendedResult') || '[]'
  const defaultRecommendedResult = JSON.parse(localStorageRecommendedResult)
  const [dataSource, setDataSource] = useState<Data[]>(defaultRecommendedResult)
  const setUpdatedRecommendedResults = (updatedRecommendedResults: Data[]) => {
    setDataSource(updatedRecommendedResults)
    localStorage.setItem('recommendedResult', JSON.stringify(updatedRecommendedResults))
  }

  const handleResultClear = () => {
    const updatedResult: Data[] = []
    setUpdatedRecommendedResults(updatedResult)
  }

  const getArticles = async () => {
    const defaultQueryString = qs.stringify(defaultQuery)
    const keyQuery = compose(
      join('&'),
      map(label => `key[]=${label}`)
    )(selectedTags)
    const query = `${defaultQueryString}&${keyQuery}`

    const response = await fetch(`${apiURL}?${query}`)
    const json = await response.json()

    let result: Data[]
    if (!json || json.total === 0) {
      result = []
    } else {
      result = map(article => ({
        link: article && article.link,
        thumbnail: article && article.thumb,
        title: article && article.title,
        keywords: article && article.tags && map(tagInfo => tagInfo && tagInfo.tag, article.tags)
      }), json.articles)
    }
    setLoading(false)
    setIsSearching(false)
    setUpdatedRecommendedResults(result)
  }

  useEffect(() => {
    if (isSearching && selectedTags && length(selectedTags) > 0) {
      setLoading(true)
      getArticles()
    }
  }, [selectedTags])

  return (
      <div className="recommend-result">
        {map(label => (
          <Tag key={label}>{label}</Tag>
        ), selectedTags)}
        <h3>最適合你的是...</h3>
        <Button onClick={handleResultClear}>清除搜尋結果</Button>
        <Table columns={columns} dataSource={dataSource} loading={loading} />
      </div>
  )
}

export default RecommendResult
