const gqlProjection = require('graphql-advanced-projection');

module.exports = gqlProjection({
  Book: {
    proj: {
      id: '_id',
      items: 'itemsID',
    },
  },
  Item: {
    proj: {
      id: '_id',
    },
  },
});