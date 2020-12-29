import req from "tinyreq"
import cheerio from "cheerio"

const find = async ({ artist, name }) => {
  const q = `site:bandcamp.com ${artist} ${name}`
  async function startBrowser() {
    let browser;
    try {
      console.log("Opening the browser......");
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],
        'ignoreHTTPSErrors': true
      });
    } catch (err) {
      console.log("Could not create a browser instance => : ", err);
    }
    return browser;
  }

  //Start the browser and create a browser instance
  let browserInstance = startBrowser();

  // Pass the browser instance to the scraper controller


  async function scrapeAll() {
    let browser;
    try {
      browser = await browserInstance;
      return await scraperObject.scraper(browser);

    }
    catch (err) {
      console.log("Could not resolve the browser instance => ", err);
    }
  }

  const scraperObject = {
    url: `http://google.com/search?q=${encodeURIComponent(q)}`,
    async scraper(browser) {
      let page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);
      await page.waitForSelector('[data-async-context]');

      const hrefs = await page.$$eval('[data-async-context*="query"] a', anchors => [].map.call(anchors, a => a.href));
      return hrefs
    }
  }

  const hrefs = await scrapeAll()
  console.log('hrefs')
  return hrefs.map(url => ({
    url
  }))
}

export default find