// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var bandcampScraper = require('bandcamp-scraper');

export default async (req, res) => {
  
  const getInfo = (url) => new Promise((resolve, reject) => {
    bandcampScraper.getAlbumInfo(url, (error, bandcampMetaData) => {
      if(error){
        reject(error)
        return
      }
      resolve(bandcampMetaData.raw)
    })
  })
  res.statusCode = 200
  res.json(await getInfo(req.query.url))
}
