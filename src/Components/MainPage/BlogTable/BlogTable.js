// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  addLayoutArticle,
  fetchLayoutArticles,
  removeLayoutArticle,
  updateLayoutArticle,
} from '../../../actions'
import LayoutArticle from './LayoutArticle'

import './BlogTable.scss'

type BlogTableProps = {
  addNewToLayoutArticles: (Object) => Object,
  containerId: number,
  error: null | Object,
  fetchContent: () => Object | Promise<Object>,
  layoutArticles: Array<Object>,
  loading: boolean,
  removeFromLayoutArticles: (number) => Object,
  updateInLayoutArticle: (number, Object) => Object
}

class BlogTable extends Component<BlogTableProps> {
  componentDidMount() {
    this.props.fetchContent()
  }

  addArticleToLayout = () => {
    const newItem = {
      title: '',
      content: '',
      author: '',
      tags: [],
    }

    this.props.addNewToLayoutArticles(newItem)
  }

  render() {
    const {
      containerId,
      error,
      loading,
      layoutArticles,
      removeFromLayoutArticles,
      updateInLayoutArticle,
    } = this.props

    if (error)
      return <div>Error! {error.message}</div>

    if (loading)
      return <div>Loading...</div>

    return (
      <div className={'BlogTable'}>
        {layoutArticles.map(article => (
          <LayoutArticle
            layoutArticles={layoutArticles}
            article={article}
            articleId={containerId}
            key={article.id}
            updateArticle={updateInLayoutArticle}
            removeArticle={removeFromLayoutArticles}
          />
        ))}
        <button
          className={'BlogTable__add-container'}
          onClick={this.addArticleToLayout}
        >
          Add container
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  layoutArticles: state.layoutArticles.layoutArticles,
  loading: state.layoutArticles.loading,
  error: state.layoutArticles.error,
})

const mapDispatchToProps = dispatch => {
  return {
    addNewToLayoutArticles: (data) => {
      dispatch(addLayoutArticle(data))
    },
    fetchContent: () => dispatch(fetchLayoutArticles()),
    removeFromLayoutArticles: (id) => dispatch(removeLayoutArticle(id)),
    updateInLayoutArticle: (id, data) => {
      dispatch(updateLayoutArticle(id, data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogTable)