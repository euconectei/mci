const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const Book = require('./BooksModel');
const { resolvers, project } = require('../projection');

module.exports = makeExecutableSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, '../api/api.graphql'), 'utf-8'),
  resolvers: _.merge(resolvers, {
    Query: {
      async book(parent, {id}, context, info) {
        const proj = project(info);
        const result = await Book.findById(id, proj);
        return result.toObject();
      },
    },
    Book: {
      async items(parent, args, context, info) {
        const proj = project(info);
        if (_.keys(proj).length === 1) {
          return parent.itemsID.map((id) => ({ _id: id }));
        }
        await Book.populate(parent, { path: 'itemsID', select: proj });
        return parent.itemsID;
      },
    },
  }),
});