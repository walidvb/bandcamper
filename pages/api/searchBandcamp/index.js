import bandcampScraper from './scraper'
import bandcampApi from './fromAutocomplete';
import googleScraper from './google';

const scrapers = {
  bandcampApi,
  bandcampScraper,
  googleScraper
}

const searchBandcamp = async ({ artist, name }, scraper = 'bandcampApi') => {
  const results = await scrapers[scraper]({ artist, name })
  return results
}

export default searchBandcamp