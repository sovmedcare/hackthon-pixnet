import fetch from 'isomorphic-unfetch'
import qs from 'qs'
import { map, mergeAll } from 'ramda'

import { labels } from '../../static/labels'
import { saveJSON } from '../utils';

const similarWordApiURL = `https://emma.pixnet.cc/explorer/keywords`
const defaultQuery = {
  format: 'json'
}

const getLabelWithTags = async (label: string) => {
  const defaultQueryString = qs.stringify(defaultQuery)
  const keyQuery = { key: label }
  const keyQueryString = qs.stringify(keyQuery)
  const query = `${defaultQueryString}&${keyQueryString}`
  try {
    const response = await fetch(`${similarWordApiURL}?${query}`)
    const json = await response.json()
    const pixnetTags = json.data
    const result = { [label]: pixnetTags }
  
    return result
  } catch (e) {
    return { [label]: label }
  }
}

const run = async () => {
  const resultList = await Promise.all(
    map((label) => getLabelWithTags(label), labels)
  )

  const result = mergeAll(resultList)

  saveJSON(result, 'rawPixnetTags')
}

run()
