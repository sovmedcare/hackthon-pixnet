// @ts-ignore
import { sify } from 'chinese-conv'
// @ts-ignore
import synonyms from 'node-synonyms'

const getSimilarity = async (word1: string, word2: string) => {
  try {
    const simplifiedWord1 = sify(word1)
    const simplifiedWord2 = sify(word2)
    const similarity = await synonyms.compare(simplifiedWord1, simplifiedWord2)
    return similarity
  } catch (e) {
    return 0
  }
}


export { getSimilarity }