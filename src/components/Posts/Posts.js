// @flow
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import PostContainer from './PostsContainer'
import { fetchLayout, fetchArticles, fetchRows } from '../../actions'
import { getAllArticles, getAllRows, getIdsInLayout, getLayoutParameters } from '../../reducers'

import '../../grid.scss'

type PostsProps = {
  articlesInLayout: Array<Object>,
  layoutParameters: Array<Object>,
  fetchLayout: Function,
  fetchArticles: Function,
  fetchRows: Function,
  rows: Array<string>
}

const Posts = ({ articlesInLayout, layoutParameters, fetchLayout, fetchArticles, fetchRows, rows }: PostsProps) => {
  useEffect(() => {
    fetchArticles()
  }, [])

  useEffect(() => {
    fetchLayout()
  }, [])

  useEffect(() => {
    fetchRows()
  }, [])

  return (
    rows.map(row =>
      <PostContainer
        key={row.id}
        articleIdsInRow={row.articlesInRow}
        articlesInRow={articlesInLayout.filter(article => row.articlesInRow.indexOf(article.id) !== -1)}
        parametersOfRowArticles={layoutParameters.filter(param => row.articlesInRow.indexOf(param.id !== -1))}
      />
    )
  )
}

export default connect(
  state => ({
    articlesInLayout: getAllArticles(state).filter(article => getIdsInLayout(state).indexOf(article.id) !== -1),
    layoutParameters: getLayoutParameters(state),
    rows: getAllRows(state)
  }),
  { fetchLayout, fetchArticles, fetchRows }
)(Posts)