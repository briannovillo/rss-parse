const Parser = require('rss-parser');
const parser = new Parser();
const urlParse = require('url');
const fs = require('fs');

const sites = [
  'https://www.infobae.com/feeds/rss/',
  'http://contenidos.lanacion.com.ar/herramientas/rss-origen=2',
  'https://www.clarin.com/rss/lo-ultimo/',
  //'https://www.perfil.com/rss/ultimo-momento',
  //'https://www.cronicatv.com.ar/sitemaps/sitemap-googlenews.xml',
  'https://www.pagina12.com.ar/rss/portada',
  'https://www.ambito.com/rss/home.xml'
];

const getDomain = (url) => urlParse.parse(url).host.split('.')[1];
const saveObjectIntoFile = (fileName, data) => fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

const crawl = async (url) => {
  const feed = await parser.parseURL(url);
  saveObjectIntoFile(`./scraped/${getDomain(feed.link)}.json`, feed);
};

sites.forEach((url) => crawl(url));
