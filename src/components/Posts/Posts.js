// @flow
import React from 'react'
import { connect } from 'react-redux'
import { branch, compose, renderComponent, withProps } from 'recompose'

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
  const { layoutArticles } = props

  console.log(props)

  return (
    layoutArticles.map(article => (
      <PostContainer post={article} key={article.id}/>
    ))
  )
}

const enhancer = compose(
  connect(
    state => ({
      layoutArticles: getAllLayoutArticles(state),
      loading: isAllLayoutArticlesLoading(state),
      error: isAllLayoutArticlesLoadingError(state)
    }),
    { fetchLayoutArticles }
  ),

  withProps(({ layoutArticles, error, loading }) => {
    if (!layoutArticles && !loading && !error)
      return fetchLayoutArticles()
  }),

  branch(({ loading }) => loading, renderComponent(() => 'Loading...')),
  branch(
    ({ error }) => error,
    renderComponent(() => 'Some error happened...')
  )
)

export default enhancer(Posts)