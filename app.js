const express = require('express');
const path = require('path');

const app = express();
const port = process.argv[2] || 5001;

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/convert/:data', (req, res) => {
  const data = req.params.data;
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
