const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = graphql

const ArticleInputType = new GraphQLInputObjectType({
  name: 'ArticleInputType',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    date: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) }
  })
})

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    date: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: GraphQLList(GraphQLString) }
  })
})

const LayoutType = new GraphQLObjectType({
  name: 'Layout',
  fields: () => ({
    id: { type: GraphQLID },
    rowId: { type: GraphQLID },
    columnSize: { type: GraphQLString },
    indexInRow: { type: GraphQLInt }
  })
})

module.exports = {
  ArticleInputType: ArticleInputType,
  ArticleType: ArticleType,
  LayoutType: LayoutType
}