const express = require('express');
const app = express();
const port = 8080;

app.use(function (req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  // res.setHeader('Access-Control-Allow-Origin', '*');
  // res.setHeader('Access-Control-Allow-Credentials', true);

  console.log(req.headers);
  // console.log(req.headers.host);

  next();
});

app.get('/', (req, res) => {
  res.send('Hello World! slash');
});

app.get('/hello/abc', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
