const express = require('express');
const app = express();
const bent = require('bent');
const cheerio = require('cheerio');
const path = require('path');

const PORT = process.env.PORT || 3001;
const USEFUL_PROPERTIES = new Set(['Name', 'Vocation', 'Residence', 'Level', 'Last Login', 'Account Status']);

const parseTableRowEl = el => el.split(':');
const replaceWhiteSpaces = str => str.replace('/ /g', '+');

const fetchCharInfo = async name => {
  name = replaceWhiteSpaces(name);

  const post = bent(
    'POST',
    'string',
    `https://www.tibia.com/community/?subtopic=characters&name=${name}`,
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept': '*/*',
      'Content-Length': '0',
      'Host': 'www.tibia.com',
      'User-Agent': 'nodejs express',
      'Connection': 'keep-alive',
    },
  );

  return cheerio.load(await post());
};

app.get('/search', async (req, res) => {
  const { name } = req.query;

  const parsedData = new Map();
  const scrap = await fetchCharInfo(name);
  const contentTableBody = scrap('.BoxContent > table > tbody');
  const contentTableRows = contentTableBody.children();

  contentTableRows.each((_, el) => {
    const innerText = cheerio(el).text();
    const [key, val] = parseTableRowEl(innerText);

    if (USEFUL_PROPERTIES.has(key)) {
      parsedData.set(key, val);
    }
  });

  res.send(
    Object.fromEntries(parsedData)
  );
});

app.use(express.static('build'));

const directoryPath = path.join('/app');

app.get('*', (req, res) => {
  res.sendFile(path.join('build', 'index.html'), {root: directoryPath});
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${ PORT }`);
});