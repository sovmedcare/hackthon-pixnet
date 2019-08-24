import qs from 'qs'

const getTagsByLabel = async (label: string) => {
  try {
    const similarWordApiURL = `https://emma.pixnet.cc/explorer/keywords`
    const defaultQuery = {
      client_id: '1cf33f4ef89548801a39f44419664e08',
      format: 'json'
    }
    const keyQuery = { key: label }

    const defaultQueryString = qs.stringify(defaultQuery)
    const keyQueryString = qs.stringify(keyQuery)
    const query = `${defaultQueryString}&${keyQueryString}`

    const response = await fetch(`${similarWordApiURL}?${query}`)
    const json = await response.json()
    const pixnetTags = json.data

    return pixnetTags
  } catch (e) {
    return [label]
  }
}

export { getTagsByLabel }