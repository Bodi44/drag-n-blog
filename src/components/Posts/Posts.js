// @flow
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import PostContainer from './PostsContainer'
import { fetchLayoutArticles, fetchArticles } from '../../actions'
import { getAllArticles, getArticlesInLayout } from '../../reducers'

type PostsProps = {
  error: null | Object,
  loading: boolean,
  layoutArticles: Array<any>,
  fetchLayoutArticles: () => Promise<any>,
  location?: Object,
  match?: Object
}

const Posts = ({ layoutArticles, fetchLayoutArticles, fetchArticles }: PostsProps) => {
  useEffect(() => {
    fetchArticles()
    fetchLayoutArticles()
  }, [])

  return (
    layoutArticles.map(article => (
      <PostContainer post={article} key={article.id}/>
    ))
  )
}

export default connect(
  state => ({
    layoutArticles: getAllArticles(state).filter(article => getArticlesInLayout(state).indexOf(article.id) !== -1)
  }),
  { fetchLayoutArticles, fetchArticles }
)(Posts)