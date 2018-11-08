const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require('graphql/type');

const BookModel = require('../mongoose/BooksModel');

function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

const bookType = new GraphQLObjectType({
  name: 'book',
  description: 'Livros cadastrados',
  fields: () => ({
    title: {
      type: GraphQLString,
      description: 'Título do livro',
    },
    author: {
      type: GraphQLString,
      description: 'Autor do livro',
    },
  }),
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootTypeQuery',
    fields: {
      book: {
        type: new GraphQLList(bookType),
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (root, {id}, source, fieldASTs) => {
          const projections = getProjection(fieldASTs);
          return new Promise((resolve, reject) => {
            let query = {};
            query._id = id;
            BookModel.find(query, projections, (err, books) => {
              err ? reject(err) : resolve(books);
            });
          });
        },
      },
    },
  }),
});

module.exports = schema;