const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');
const middlewares = require('./middlewares');
const api = require('./api');
const events = require('./api/events');

const { config } = require('./resources/config');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

// mongodb+srv://bekzodnj:Zzomeinforu123@cluster0.72lzwp2.mongodb.net/?retryWrites=true&w=majority

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.dbUrl, options, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api', api);
app.use('/api/events', events);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
