import { compose, head, map, mergeAll, keys, toPairs } from 'ramda'

import rawPixnetTags from '../../static/rawPixnetTags.json'
import { getSimilarity, saveJSON, sortByObjectValue } from '../utils'

const getMostSimilarTag = async (imageTag: string, pixnetTags: string[]) => {
  const pairs = await Promise.all(
    map(async (pixnetTag) => {
      const similarity = await getSimilarity(imageTag, pixnetTag)
      const result = { [pixnetTag]: similarity }
      return result
    }, pixnetTags)
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
        const categories = rawPixnetTags[imageTag]
        const mostSimilarTag = await getMostSimilarTag(imageTag, categories)
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