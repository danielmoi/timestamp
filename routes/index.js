const express = require('express');
const moment = require('moment');

const router = express.Router();

const getUnix = data => moment(data).valueOf();

const getNatural = data => moment(data).format('DD MMMM YYYY');

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Timestamp',
  });
});

router.get('/convert/:data', (req, res) => {
  const data = req.params.data;
  let unix = null;
  let natural = null;

  if (!isNaN(Number(data))) {
    const valid = Number(data);
    unix = getUnix(Number(valid));
    natural = getNatural(valid);
  } else if (moment(data).isValid()) {
    unix = getUnix(data);
    natural = getNatural(data);
  }
  res.json({ unix, natural });
});

module.exports = router;
