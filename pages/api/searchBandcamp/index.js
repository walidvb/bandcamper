var bandcamp = require('bandcamp-scraper');
import searchApi from './fromAutocomplete';
var stringSimilarity = require('string-similarity');

const searchBandcamp = async ({ artist, name }) => {
  const results = await searchApi({ artist, name })
  return results
}

export default searchBandcamp