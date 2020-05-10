const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');
const app = express();

// PORT
const PORT = process.env.PORT || 4000;

// ! Middleware optional
app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
// GET Return all provinces number of cases of Covid19
app.get('/cases', async (req, res) => {
  const url =
    'https://www.quebec.ca/sante/problemes-de-sante/a-z/coronavirus-2019/situation-coronavirus-quebec/#c50214';

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const notParsedInfo = [];
      const parsedInfo = [];
      let fixedParsedInfo = [];

      $('#c50214 tr ').each((i, el) => {
        const item = $(el).find('td').text();
        notParsedInfo.push(item);
      });

      for (let index = 2; index <= 21; index++) {
        let value = notParsedInfo[index].slice(
          notParsedInfo[index].indexOf('-') + 1,
          notParsedInfo[index].length
        );
        let provinceName = value.replace(/[0-9]/g, '');
        let numberOfCases = value.replace(/\D/g, '');
        parsedInfo.push({
          name: provinceName,
          number: parseInt(numberOfCases),
        });
      }

      parsedInfo.forEach((info) => {
        let name, number;
        if (info.name[0] === ' ') name = info.name.slice(1, info.name.length);
        else name = info.name;
        fixedParsedInfo.push({ name: name, number: info.number });
      });

      res.send(fixedParsedInfo);
    }
  });
});

app.get('/deaths', async (req, res) => {
  const url =
    'https://www.quebec.ca/sante/problemes-de-sante/a-z/coronavirus-2019/situation-coronavirus-quebec/#c50214';

  request(url, (error, response, html) => {
    if (!error && response.statusCode === 200) {
      const $ = cheerio.load(html);
      const notParsedInfo = [];
      const parsedInfo = [];
      let fixedParsedInfo = [];

      $('#c51880 tr ').each((i, el) => {
        const item = $(el).find('td').text();
        notParsedInfo.push(item);
      });

      for (let index = 2; index <= 21; index++) {
        let value = notParsedInfo[index].slice(
          notParsedInfo[index].indexOf('-') + 1,
          notParsedInfo[index].length
        );
        let provinceName = value.replace(/[0-9]/g, '');
        let numberOfCases = value.replace(/\D/g, '');
        parsedInfo.push({
          name: provinceName,
          number: parseInt(numberOfCases),
        });
      }

      parsedInfo.forEach((info) => {
        let name, number;
        if (info.name[0] === ' ') name = info.name.slice(1, info.name.length);
        else name = info.name;
        fixedParsedInfo.push({ name: name, number: info.number });
      });

      res.send(fixedParsedInfo);
    }
  });
});

// Make the server listen on PORT 4000
app.listen(PORT, () => console.log(`The Server is listening on PORT ${PORT}`));
