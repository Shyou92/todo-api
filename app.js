const express = require('express');
const mongoose = require('mongoose');

const PORT = 3000;

const app = express();

mongoose.connect('mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});

app.listen(PORT, () => {
  console.log(`App is being listened on port ${PORT}`)
});