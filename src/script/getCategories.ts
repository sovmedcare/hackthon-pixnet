// @ts-ignore
import { sify } from 'chinese-conv'
// @ts-ignore
import synonyms from 'node-synonyms'
import { compose, head, map, mergeAll, keys, toPairs } from 'ramda'

import rawPixnetTags from '../../static/rawPixnetTags.json'
import { saveJSON, sortByObjectValue } from '../utils'

const getSimilarityPair = async (imageTag: string, pixnetTag: string) => {
  const sen1 = sify(imageTag)
  const sen2 = sify(pixnetTag)
  try {
    const similarity = await synonyms.compare(sen1, sen2)
    const result = { [pixnetTag]: similarity }
    return result
  } catch (e) {
    return { [pixnetTag]: 0 }
  }
}

const getMostSimilarTag = async (imageTag:string, pixnetTags: string[]) => {
  const pairs = await Promise.all(
    map(pixnetTag => getSimilarityPair(imageTag, pixnetTag), pixnetTags)
  )
  const sortedPairs = sortByObjectValue(pairs)
  const mostSimilarTag = compose(
    head,
    head,
    toPairs,
    head
  )(sortedPairs)

  return mostSimilarTag
}

const run = async () => {
  try {
    const imageTags = keys(rawPixnetTags) as string[]
    const mostSimilarTagList = await Promise.all(
      map(async (imageTag) => {
        const pixnetTags = rawPixnetTags[imageTag]
        const mostSimilarTag = await getMostSimilarTag(imageTag, pixnetTags)
        return { [imageTag]: mostSimilarTag }
      }, imageTags)
    )
    const mostSimilarTagObject = mergeAll(mostSimilarTagList)

    saveJSON(mostSimilarTagObject, 'categories')
  } catch (e) {
    throw e
  }
}

run()