import { flatten, map, prop, sort, uniq } from 'ramda'

import imageLabelInfos from '../../static/food_merged.json'
import { saveJSON } from '../utils'

const labelGroups = map(prop('labels'), imageLabelInfos)

const labels = flatten(labelGroups)

const rawUniqueLabels = uniq(labels)

const diff = (a: string, b: string) => a.localeCompare(b)
const sortedLabels = sort(diff, rawUniqueLabels)

const json = { labels: sortedLabels }

saveJSON(json, 'labels')
