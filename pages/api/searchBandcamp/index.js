import bandcampScraper from './scraper'
import bandcampApi from './fromAutocomplete';
import googleScraper from './google';
var stringSimilarity = require('string-similarity');

const scrapers = {
  bandcampApi,
  bandcampScraper,
  googleScraper
}

const searchBandcamp = async ({ artist, name }, scraper = 'googleScraper') => {
  const results = await scrapers[scraper]({ artist, name })
  return results
}

export default searchBandcamp