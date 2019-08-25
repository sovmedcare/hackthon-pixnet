import fs from 'fs'
// @ts-ignore
import uuid from 'uuid'
import { map, assoc } from 'ramda'

fs.readFile('./food_merged.json', 'utf-8', (err, data) => {
  const foodMerged= JSON.parse(data);
  const foodMergedWithUid = map(item => assoc('id', uuid(), item), foodMerged)
  fs.writeFile('./food_merged_with_id.json', JSON.stringify(foodMergedWithUid, null, 2), (err) => {
    if (err) {
      throw err
    }
    console.log('successfully add id')
  })
})