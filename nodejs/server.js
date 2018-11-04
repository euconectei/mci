const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// const mongoose = require('mongoose');
// const configDB = require('./config/database.js');
// mongoose.connect(configDB.url), {
//   useNewUrlParser: true
// };

const bodyParser = require('body-parser');

const BooksController = require('./app/books/BooksController.js');

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }));

app.route('/')
  .get((req, res) => {
    res.sendFile(`${__dirname}/app/index.html`);
  })

app.route('/book')
  .get((req, res) => BooksController.list(req, res))
  .post((req, res) => BooksController.create(req, res));

app.route('/book/:id')
  .get((req, res) => BooksController.retrieve(req, res))
  .delete((req, res) => BooksController.delete(req, res))
  .post((req, res) => BooksController.update(req, res));

app.listen(port, () => console.log(`Listening on http://localhost:${port}!`));
