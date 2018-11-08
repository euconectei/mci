const mongoose = require("mongoose");
const configDB = require('../config/database');
const Schema = mongoose.Schema;

mongoose.connect(configDB.url, {
  useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
db.once('open', () => {
  console.log( '+++Connected to mongoose')
});

const BookSchema = new Schema({
  _id: String,
  title: String,
  author: String,
}, {collection: 'Books'});

const Book = mongoose.model('Book', BookSchema);

module.exports = Book;