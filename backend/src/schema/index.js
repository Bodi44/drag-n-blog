const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const Article = require('../models/article')
const Layout = require('../models/layout')

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

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addArticle: {
      type: ArticleType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        author: { type: new GraphQLNonNull(GraphQLString) },
        tags: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) }
      },
      resolve(parent, args) {
        let article = new Article({
          title: args.title,
          content: args.content,
          date: args.date,
          author: args.author,
          tags: args.tags
        })
        return article.save()
      }
    },
    addToLayout: {
      type: LayoutType,
      args: {
        columnSize: { type: new GraphQLNonNull(GraphQLString) },
        rowId: { type: new GraphQLNonNull(GraphQLID) },
        indexInRow: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let layoutParam = new Layout({
          columnSize: args.columnSize,
          rowId: args.rowId,
          indexInRow: args.indexInRow
        })
        return layoutParam.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
