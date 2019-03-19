// @flow
import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import {
  addLayoutArticle,
  fetchLayoutArticles,
  removeLayoutArticle,
  updateLayoutArticle
} from '../../../actions'

import {
  getAllLayoutArticles,
  isAllLayoutArticlesLoading,
  isAllLayoutArticlesLoadingError
} from '../../../reducers'

import LayoutArticle from './LayoutArticle'

import './BlogTable.scss'
import BEM from '../../../helpers/BEM'

const b = BEM('BlogTable')

type BlogTableProps = {
  addLayoutArticle: (Object) => Object,
  containerId: number,
  error: null | Object,
  fetchLayoutArticles: () => Object | Promise<Object>,
  layoutArticles: Array<Object>,
  loading: boolean,
  removeLayoutArticle: (number) => Object,
  updateLayoutArticle: (number, Object) => Object
}

const BlogTable = (props: BlogTableProps) => {
  const {
    containerId,
    error,
    loading,
    addLayoutArticle,
    layoutArticles,
    fetchLayoutArticles,
    removeLayoutArticle,
    updateLayoutArticle
  } = props

  useEffect(() => {
    fetchLayoutArticles()
  }, [])

  if (error) return <div>Error! {error.message}</div>
  if (loading) return <div>Loading...</div>

  return (
    <div className={b()}>
      {layoutArticles.map(article => (
        <LayoutArticle
          layoutArticles={layoutArticles}
          article={article}
          articleId={containerId}
          key={article.id}
          updateArticle={updateLayoutArticle}
          removeArticle={removeLayoutArticle}
        />
      ))}
      <button
        className={b('add-container')}
        onClick={() => addLayoutArticle({
          title: '',
          content: '',
          author: '',
          tags: []
        })}
      >
        Add container
      </button>
    </div>
  )
}

export default connect(
  state => ({
    layoutArticles: getAllLayoutArticles(state),
    loading: isAllLayoutArticlesLoading(state),
    error: isAllLayoutArticlesLoadingError(state)
  }),
  {
    addLayoutArticle,
    fetchLayoutArticles,
    removeLayoutArticle,
    updateLayoutArticle
  }
)(BlogTable)