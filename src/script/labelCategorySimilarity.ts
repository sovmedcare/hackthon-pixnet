import { drop, last, length, map, sort, take } from 'ramda'

import customCategories from '../../static/custom_categories.json'
import labels from '../../static/labels.json'
import { getSimilarity, saveJSON } from '../utils'

const getSimilarityMappingOfLabel = async (label: string) => {
  const labelMapping = await Promise.all(
    map(async (category) => {
      const similarity = await getSimilarity(label, category)
      const item = [label, category, similarity]
      return item
    }, customCategories)
  )

  return labelMapping
}

const run = async () => {
  const labelNumberPerBatch = 10
  const totalBatchNumber = length(labels) / labelNumberPerBatch
  for (let sectionIndex = 0; sectionIndex < totalBatchNumber; sectionIndex++) {
    const partOfLabels = take(labelNumberPerBatch, drop(sectionIndex * labelNumberPerBatch, labels))

    const result = await Promise.all(
      map(async (label) => {
        const labelMapping = await getSimilarityMappingOfLabel(label)
        const sortedMapping = sort((a, b) => {
          return last(b) - last(a)
        }, labelMapping)
        return sortedMapping
      }, partOfLabels)
    )

    await saveJSON(result, `mappings/mapping${sectionIndex}`)
  }
}

run()