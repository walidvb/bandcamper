var bandcamp = require('bandcamp-scraper');
var stringSimilarity = require('string-similarity');

const searchBandcamp = async ({ artist, name }) => {

  var params = {
    query: `${artist} ${name}`,
    page: 1
  };

  const results = await searchAsPromise({ artist, name })
  const match = results.find(isMatch)
  if (match) {
    return ({
      artist, name, ...match
    })
  }
  return undefined

  function isMatch({ type, ...r }){
    if(type !== 'track') return

    console.log(r.candidate, artist)
    console.log("=========")
    return (
      stringsMatch(r.artist, artist) ||
      stringsMatch(r.name, name)
    )
  }

  function searchAsPromise(){
    return new Promise((resolve, reject) => {
      bandcamp.search(params, function (error, searchResults) {
        if (error) {
          console.log(error);
          reject('no match found')
          return
        }
        resolve(searchResults);
        console.log(params.query, 'not found')
      });
    })
  }
}

export default searchBandcamp

const stringsMatch = (a, b) => stringSimilarity.compareTwoStrings(a.toLowerCase(), b.toLowerCase()) > .4