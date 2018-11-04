const BooksModel = require('./BooksModel');

let query = {};

const BooksController = {
  create: (req, res) => {
    const data = { title, author } = req.body;
    console.log(data);
    BooksModel.create(
      data,
      (err, data) => {
        (err) ? console.log(err) : res.send(`Livro ${data.title} cadastrado com id: ${data._id}`);
      }
    );
  },
  list: (req, res) => {
    BooksModel.find(
      (err, data) => {
        console.log(data);
        (err) ? console.log(err) : res.send(data);
      }
    );
  },
  retrieve: (req, res) => {
    query._id = req.params.id;
    console.log(query);
    BooksModel.findOne(
      query,
      (err, data) =>{
        res.send((err) ? err : data);
      }
    );
  },
  update: (req, res) => {
    const data = { title, author } = req.body;
    query._id = req.params.id;
    BooksModel.updateOne(
      query,
      data,
      (err, data) => {
        (err) ? console.log(err) : res.send(`Livro ${query._id} atualizado com sucesso`);
      }
    );
  },
  delete: (req, res) => {
    query._id = req.params.id;
    BooksModel.findByIdAndDelete(
      query,
      (err, data) => {
        (err) ? err : res.send(`Livro ${query._id} apagado com sucesso!`);
      }
    );
  }
}

module.exports = BooksController;