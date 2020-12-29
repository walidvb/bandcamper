// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import searchBandcamp from './searchBandcamp'

export default async (req, res) => {
  if(req.method === 'POST'){

  }
  const bandcampMetaData = await searchBandcamp(req.body)
  res.statusCode = 200
  res.json(bandcampMetaData)
}
