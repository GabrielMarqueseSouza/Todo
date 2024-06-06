const express = require('express');
const mongoose = require('mongoose');
const app = express();
const todoRoute = require('./routes/todo.route.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todo', todoRoute);

mongoose
  .connect('mongodb://root:mongopw@localhost:27021', { dbName: 'tododb' })
  .then(() => {
    console.log('Connected to todo database');
    app.listen(9000, () => {
      console.log('Server started on port 9000');
    });
  })
  .catch((err) => {
    console.log({ message: err.message });
  });
