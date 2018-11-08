//https://medium.com/@gethylgeorge/setting-up-a-simple-graphql-server-with-node-express-and-mongoose-ff8a1071af53


const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

const graphqlHTTP = require('express-graphql');

const schema = require('./schema/schema');
const Book = require('./mongoose/BooksModel');



// start the server
app.listen(port, () => console.log('Now browse to localhost:4000/graphql'));

app.route('/book')
  .post((req, res) => {
    const bookItem = new Book({
      title: req.body.title,
      author: req.body.author,
    });

    bookItem.save((err, result) => {
      if (err) { console.log({err}); }
      console.log(`Livro ${result} salvo com sucesso!`);
      res.redirect('/');
    });
  })
  .get((req, res) => {
    Book.find(
      (err, data) => {
        console.log(data);
        (err) ? console.log(err) : res.send(data);
      }
    );
  });


app.use("/graphql", graphqlHTTP(req => ({
  schema,
  graphiql: true
})));