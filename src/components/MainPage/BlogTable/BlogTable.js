// @flow
import React, { useEffect } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import flow from 'lodash/flow'

import {
  fetchArticles,
  fetchLayoutArticles,
  addLayoutArticle,
  updateArticle,
  removeLayoutArticle,
  updateLayoutArticle
} from '../../../actions'

import {
  getAllArticles,
  getArticlesInLayout,
  getLayoutArticlesSizes
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
    connectDropTarget,
    containerId,
    layoutArticles,
    fetchLayoutArticles,
    fetchArticles,
    removeLayoutArticle,
    updateArticle,
    hovered
  } = props

  useEffect(() => {
    fetchArticles()
    fetchLayoutArticles()
  }, [])

  return connectDropTarget(
    <div className={b()} style={{backgroundColor: hovered? '#ecf0f1' : '#ffffff'}}>
      {layoutArticles.map(article => (
        <LayoutArticle
          layoutArticles={layoutArticles}
          article={article}
          articleId={containerId}
          key={article.id}
          updateArticle={updateArticle}
          removeArticle={removeLayoutArticle}
        />
      ))}
    </div>
  )
}

export default flow(
  DropTarget(
    'Article',
    {
      drop(props, monitor) {
        const { containerId } = props
        props.addLayoutArticle({
          id: monitor.getItem().id,
          col: '',
          row: '',
          size: {
            minWidth: '500px',
            maxWidth: '500px'
          }
        })
        props.updateArticle(monitor.getItem().id,
          {
            title: monitor.getItem().title,
            content: monitor.getItem().content,
            author: monitor.getItem().author,
            tags: monitor.getItem().tags,
            inLayout: true
          })

        return { containerId }
      },

      canDrop(props, monitor) {
        return props.layoutArticles.filter(article => article.id === monitor.getItem().id).length === 0
      }
    },
    (connect, monitor) => (
      {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem(),
        canDrop: monitor.canDrop()
      }
    )
  ),
  connect(
    state => ({
      layoutArticles: getAllArticles(state).filter(article => getArticlesInLayout(state).indexOf(article.id) !== -1),
      layoutArticlesSizes: getLayoutArticlesSizes(state)
    }),
    {
      fetchArticles,
      updateArticle,
      fetchLayoutArticles,
      addLayoutArticle,
      removeLayoutArticle,
      updateLayoutArticle
    }
  ))(BlogTable)