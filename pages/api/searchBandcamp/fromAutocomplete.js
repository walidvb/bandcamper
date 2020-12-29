import Axios from "axios"

const BRANDCAMP_SEARCH_URL = "https://bandcamp.com/api/nusearch/2/autocomplete?q="

const searchApi = async ({ artist, name }) => {
  const queryURL = `${BRANDCAMP_SEARCH_URL}${encodeURIComponent(`${artist} ${name}`)}`
  const results = await Axios.get(queryURL)
  const sorted = results.data.results
    .sort((a, b) => {
      if((a.type !== 'b' && b.type !== 'b') || (b.weight === 0 || a.weight === 0)){
        return b.weight - a.weight
      }
      if(a.type === 'b'){
        if(a.name === artist){
          return 1
        }
        return 1
      }
      if(b.type === 'b'){
        if(b.name === artist){
          return 1
        }
        return -1
      }
    })
    console.log("Sorted results for", artist, name)
  console.table(sorted.map(({ weight, type, name, band_name }) => ({ weight, type, name, band_name})))
  return sorted
}

export default searchApi