import req from "tinyreq"
import cheerio from "cheerio"

const find = async ({ artist, name }) => {
  const q = `site:bandcamp.com ${artist} ${name}`
  const url = `https://google.com/search?q=${encodeURIComponent(q)}`
  const html = await req(url)
  var $ = cheerio.load(html);
  const matches = $('a')
  console.log("MATCHES ++++++++++")
  console.log(matches
    .toArray()
    .map(a => a.attribs.href)
    )
  const hrefs = matches
    .toArray()
    .map(a => a.attribs.href)
    .filter((href) => /^\/url\?q\=h/.test(href))
    // .filter((href) => !/google/.test(href))
    .map(href => decodeURIComponent(/q=([^&]*)/.exec(href)?.[1]))

  return hrefs.map((url) => ({ url }))
}

export default find