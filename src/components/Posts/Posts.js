// @flow
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import PostContainer from './PostsContainer'
import { fetchLayoutArticles } from '../../actions'
import {
  getAllLayoutArticles,
  isAllLayoutArticlesLoading,
  isAllLayoutArticlesLoadingError
} from '../../reducers'

type PostsProps = {
  error: null | Object,
  loading: boolean,
  layoutArticles: Array<any>,
  fetchLayoutArticles: () => Promise<any>,
  location?: Object,
  match?: Object
}

const Posts = (props: PostsProps) => {
  const { layoutArticles, error, loading } = props

  useEffect(() => {
    props.fetchLayoutArticles()
  }, layoutArticles.length)

  if (error) return <div>Error! {error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    layoutArticles.map(article => (
      <PostContainer post={article} key={article.id}/>
    ))
  )
}

export default connect(
  state => ({
    layoutArticles: getAllLayoutArticles(state),
    loading: isAllLayoutArticlesLoading(state),
    error: isAllLayoutArticlesLoadingError(state)
  }),
  { fetchLayoutArticles }
)(Posts)