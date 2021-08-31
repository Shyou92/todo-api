require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const PORT = 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
})

app.use(requestLogger);

app.use('/', routes);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT);