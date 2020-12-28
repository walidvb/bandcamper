import Axios from "axios"

const BRANDCAMP_SEARCH_URL = "https://bandcamp.com/api/nusearch/2/autocomplete?q="

const searchApi = async ({ artist, name }) => {
  const queryURL = `${BRANDCAMP_SEARCH_URL}${encodeURIComponent(`${artist} ${name}`)}`
  const results = await Axios.get(queryURL)
  return results.data.auto.results
}

export default searchApi