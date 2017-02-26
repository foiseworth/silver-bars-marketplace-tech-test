const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(`${req.method} to ${req.path}`); // eslint-disable-line no-console
  next();
});

app.post('/register', require('./api/register'));

// app.post('/cancel', require('./api/cancel'));

// app.get('/summary', require('./api/summary'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application available at http://localhost:${port}`); // eslint-disable-line no-console
  console.log('Available routes are: register[POST]|cancel[POST]|summary[GET]'); // eslint-disable-line no-console
});
