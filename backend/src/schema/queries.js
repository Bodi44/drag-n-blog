const graphql = require('graphql')
const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql

const types = require('./types')
const { ArticleType, LayoutType } = types

const Article = require('../models/article')
const Layout = require('../models/layout')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    article: {
      type: ArticleType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Article.findById(args.id)
      }
    },
    layoutParam: {
      type: LayoutType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Layout.findById(args.id)
      }
    },
    articles: {
      type: new GraphQLList(ArticleType),
      resolve() {
        return Article.find({})
      }
    },
    layoutParams: {
      type: new GraphQLList(LayoutType),
      resolve() {
        return Layout.find({})
      }
    }
  }
})

module.exports = RootQuery