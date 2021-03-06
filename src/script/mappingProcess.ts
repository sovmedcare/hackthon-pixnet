import { compose, flatten, head, isNil, map, mergeAll, reject } from 'ramda'

import mapping0 from '../../static/mappings/mapping0.json'
import mapping1 from '../../static/mappings/mapping1.json'
import mapping2 from '../../static/mappings/mapping2.json'
import mapping3 from '../../static/mappings/mapping3.json'
import mapping4 from '../../static/mappings/mapping4.json'
import mapping5 from '../../static/mappings/mapping5.json'
import mapping6 from '../../static/mappings/mapping6.json'
import mapping7 from '../../static/mappings/mapping7.json'
import mapping8 from '../../static/mappings/mapping8.json'
import mapping9 from '../../static/mappings/mapping9.json'
import mapping10 from '../../static/mappings/mapping10.json'
import mapping11 from '../../static/mappings/mapping11.json'
import mapping12 from '../../static/mappings/mapping12.json'
import mapping13 from '../../static/mappings/mapping13.json'
import mapping14 from '../../static/mappings/mapping14.json'
import mapping15 from '../../static/mappings/mapping15.json'
import mapping16 from '../../static/mappings/mapping16.json'
import mapping17 from '../../static/mappings/mapping17.json'
import mapping18 from '../../static/mappings/mapping18.json'
import mapping19 from '../../static/mappings/mapping19.json'
import mapping20 from '../../static/mappings/mapping20.json'
import mapping21 from '../../static/mappings/mapping21.json'
import mapping22 from '../../static/mappings/mapping22.json'
import mapping23 from '../../static/mappings/mapping23.json'
import mapping24 from '../../static/mappings/mapping24.json'
import mapping25 from '../../static/mappings/mapping25.json'
import mapping26 from '../../static/mappings/mapping26.json'
import mapping27 from '../../static/mappings/mapping27.json'
import mapping28 from '../../static/mappings/mapping28.json'
import { saveJSON } from '../utils/index';

const getLabel = compose((element) => element[0], head)
const getCategory = compose((element) => element[1], head)
const getSimilarity = compose((element) => element[2], head)

const getPairs = (mapping: any) => {
  const label = getLabel(mapping)
  const category = getCategory(mapping)
  const similarity = getSimilarity(mapping)
  if (similarity === 0) {
    return { [label]: undefined }
  }
  return { [label]: category }
}

const pairs = []
pairs[0] = map(getPairs, mapping0)
pairs[1] = map(getPairs, mapping1)
pairs[2] = map(getPairs, mapping2)
pairs[3] = map(getPairs, mapping3)
pairs[4] = map(getPairs, mapping4)
pairs[5] = map(getPairs, mapping5)
pairs[6] = map(getPairs, mapping6)
pairs[7] = map(getPairs, mapping7)
pairs[8] = map(getPairs, mapping8)
pairs[9] = map(getPairs, mapping9)
pairs[10] = map(getPairs, mapping10)
pairs[11] = map(getPairs, mapping11)
pairs[12] = map(getPairs, mapping12)
pairs[13] = map(getPairs, mapping13)
pairs[14] = map(getPairs, mapping14)
pairs[15] = map(getPairs, mapping15)
pairs[16] = map(getPairs, mapping16)
pairs[17] = map(getPairs, mapping17)
pairs[18] = map(getPairs, mapping18)
pairs[19] = map(getPairs, mapping19)
pairs[20] = map(getPairs, mapping20)
pairs[21] = map(getPairs, mapping21)
pairs[22] = map(getPairs, mapping22)
pairs[23] = map(getPairs, mapping23)
pairs[24] = map(getPairs, mapping24)
pairs[25] = map(getPairs, mapping25)
pairs[26] = map(getPairs, mapping26)
pairs[27] = map(getPairs, mapping27)
pairs[28] = map(getPairs, mapping28)

const flattenPairs = flatten(pairs)

const result = reject(isNil, mergeAll(flattenPairs))

saveJSON(result, 'categories')