import { compose, flatten, last, sort, toPairs } from 'ramda'

export interface Result {
  [tag: string]: number
}

const sortingCondition = (a: Result, b: Result) => {
  const getCount = compose(
    Number,
    last,
    flatten,
    toPairs
  )
  const countA = getCount(a)
  const countB = getCount(b)

  return countB - countA
}

const sortByObjectValue = sort(sortingCondition)

export { sortByObjectValue }