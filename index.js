const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const router = require('./config/router');

const { dbURI, port } = require('./config/environment');

const app = express();
app.use(express.static(`${__dirname}/public`));

mongoose.connect(dbURI);
app.use(bodyParser.json());

app.use('/api', router);

app.use((err, req,res,next) => {
  if (err.name === 'ValidationError') res.status(422).json({ message: err.message });
  res.status(500).json({ message: 'Internal Server Error '});
  next();
});

app.listen(port, () => console.log(`Express running on port ${port}`));

module.exports = app;
