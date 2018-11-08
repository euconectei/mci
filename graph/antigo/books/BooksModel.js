const mongoose = require('mongoose');
const configDB = require('../config/database.js');
mongoose.connect(configDB.url), {
  useNewUrlParser: true
};

const db = mongoose.connection;

db.on('error', (err) => console.log(`Erro: ${err}`));
db.on('open', () => console.log(`Conexão aberta`));
db.on('connected', () => console.log(`Conectado ao banco!`))
db.on('disconnected', () => console.log(`Desconectado do banco`));
// db.on('', () => console.log(``));

// const Schema = mongoose.Schema;
// const _schema = {
//   title: { type: String, default: '' },
//   author: { type: String, default: '' },
// };
// const ModelSchema = new Schema(_schema);

const ItemSchema = new mongoose.Schema({
  _id: String,
  title: String,
  author: String,
});

const BookSchema = new mongoose.Schema({
  _id: String,
  itemsID: [{ type: String, ref: 'items' }],
});

module.exports = {
  Item: mongoose.model('items', ItemSchema),
  Book: mongoose.model('book', BookSchema),
};

// const BooksModel = mongoose.model('books', BookSchema);

// module.exports = BooksModel;