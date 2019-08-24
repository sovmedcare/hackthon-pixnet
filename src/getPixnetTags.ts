import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import qs from 'qs'
import { map } from 'ramda'

import { labels } from '../static/labels'

const similarWordApiURL = `https://emma.pixnet.cc/explorer/keywords`
const defaultQuery = {
  format: 'json'
}

const getLabelWithTags = async (label: string) => {
  const defaultQueryString = qs.stringify(defaultQuery)
  const keyQuery = { key: label }
  const keyQueryString = qs.stringify(keyQuery)
  const query = `${defaultQueryString}&${keyQueryString}`
  const response = await fetch(`${similarWordApiURL}?${query}`)
  const json = await response.json()
  const pixnetTags = json.data
  const result = { [label]: pixnetTags }

  return result
}


const run = async () => {
  const resultList = await Promise.all(
    map((label) => getLabelWithTags(label), labels)
  )

  const content = JSON.stringify(resultList, null, 2)
  
  const destinationPath = path.resolve(__dirname, '../static/pixnetTags.json')
  fs.appendFile(
    destinationPath,
    content,
    { flag: 'a+' },
    (err) => {
      if (err) {
        throw err
      }
      console.log(`寫入資料完成`)
    }
  )
}

run()