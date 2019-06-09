const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const types = require('./types')
const { ArticleInputType, ArticleType, LayoutType } = types

const Article = require('../models/article')
const Layout = require('../models/layout')

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
    updateArticle: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        data: { type: new GraphQLNonNull(ArticleInputType) }
      },
      resolve(parent, args) {
        return Article.findByIdAndUpdate(args.id, args.data)
      }
    },
    deleteArticle: {
      type: ArticleType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return Article.findByIdAndRemove(args.id)
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

module.exports = Mutation