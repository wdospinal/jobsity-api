const csv = require('csv-stream');
const request = require('request');

const {
  URL_STOCK,
  STOCK_PATH,
  STOCK_PARAMS,
} = require('../helpers/constants');

const getStockPrice = (stock) => {
  const url = `${URL_STOCK}${STOCK_PATH}?s=${stock}.us${STOCK_PARAMS}`;
  const url2 = 'https://stooq.com/q/l/?s=aapl.us&f=sd2t2ohlcv&h&e=csv​';
  console.log(url);
  console.log(url2);
  const options = {
    endLine: '\n',
    columnOffset: 0,
  };
  const csvStream = csv.createStream(options);
  return new Promise((resolve, reject) => {
    request(url).pipe(csvStream)
      .on('error', (err) => {
        reject(err);
      })
      .on('data', (data) => {
        resolve(data);
      });
  });
};

module.exports = {
  getStockPrice,
};
