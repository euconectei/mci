import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString
} from "graphql/type";

const bookType = new GraphQLObjectType({
  name: 'book',
  description: 'Livros cadastrados',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    title: {
      type: GraphQLNonNull(GraphQLString),
    },
    author: {
      type: GraphQLString,
    },
  },
});

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootTypeQuery',
    fields: {
      book: {
        type: bookType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt),
          },
        },
        resolve: async (parent, {id}, context, info) => {
          const result = await Book.findById(id);
          return result.toObject();
        },
      },
    },
  }),
});

