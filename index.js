const bodyParser = require('body-parser');
const app = require('express')();

app.use(bodyParser.json());

app.post('/register', require('./api/register'));

// app.post('/cancel', require('./api/cancel'));

// app.get('/summary', require('./api/summary'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Application available at http://localhost:${port}`); // eslint-disable-line no-console
  console.log('Available routes are: register|cancel|summary'); // eslint-disable-line no-console
});
