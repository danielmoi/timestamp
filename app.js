const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const port = process.argv[2] || 5001;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

const getUnix = data => moment(data).valueOf();

const getNatural = data => moment(data).format('DD MMMM YYYY');

app.get('/convert/:data', (req, res) => {
  const data = req.params.data;
  let unix = null;
  let natural = null;
  console.log('data:', data);

  if (!isNaN(Number(data))) {
    console.log('we have a number!');
    const valid = Number(data);
    return res.json({
      unix: getUnix(Number(valid)),
      natural: getNatural(valid),
    });
  } else if (moment(data).isValid()) {
    console.log('we have a valid date!');
    return res.json({
      unix: getUnix(data),
      natural: getNatural(data),
    });
  } else {
    return res.json({ unix, natural });
  }
  res.json({ data });
});

app.use((err, req, res, next) => {
  console.log('err:', err);
  res.statusMessage = err.message; // eslint-disable-line
  res.json(err).status(400);
  next();
});

app.listen(port, () => {
  console.log(`🌳  🌳  🌳  Now listening on ${port} 🌳  🌳  🌳`);
});
