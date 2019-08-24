import fs from 'fs'
import path from 'path'
import { flatten, map, prop, sort, uniq } from 'ramda'

import imageLabelInfos from '../static/food_merged.json'

const labelGroups = map(prop('labels'), imageLabelInfos)

const labels = flatten(labelGroups)

const rawUniqueLabels = uniq(labels)

const diff = (a: string, b: string) => a.localeCompare(b)
const sortedLabels = sort(diff, rawUniqueLabels)

const uniqueLabelsWithEndLine = map(label => `\n  '${label}'`, sortedLabels)

const content = `const labels = [${uniqueLabelsWithEndLine}\n]`

const destinationPath = path.resolve(__dirname, '../static/labels.ts')

fs.writeFile(
  destinationPath,
  content,
  { flag: 'wx' },
  (err) => {
    if (err) {
      throw err
    }
    console.log('寫入完成')
  }
)
