const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

// const mongoose = require('mongoose');
// const configDB = require('./config/database.js');

// mongoose.connect(configDB.url), {
//   useNewUrlParser: true
// };

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Author {
    id: ID
    name: String
    lastName: String
  }

  type Book {
    id: ID
    title: String
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
  }

  type Mutation {
    createBook(
      title: String!
    ): Book
  }
`);

const root = { hello: () => 'Hello world!' };

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));