import Axios from "axios"

const BRANDCAMP_SEARCH_URL = "https://interactivetest.bandcamp.com/api/fuzzysearch/1/autocomplete?q="

const searchApi = async ({ artist, name }) => {
  const queryURL = `${BRANDCAMP_SEARCH_URL}${encodeURIComponent(`${name} ${artist}`)}`
  console.log("Querying", queryURL)
  const results = await Axios.get(queryURL)
  return results.data.auto.results
}

export default searchApi