import bandcampScraper from './scraper'
import bandcampApi from './fromAutocomplete';
import googleScraper from './google';

const scrapers = {
  bandcampApi,
  bandcampScraper,
  googleScraper
}

const searchBandcamp = async (query, scraper = 'bandcampApi') => {
  const results = await scrapers[scraper](query)
  return results
}

export default searchBandcamp