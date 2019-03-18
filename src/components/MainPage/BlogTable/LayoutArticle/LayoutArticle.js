// @flow
import React from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import flow from 'lodash/flow'

import { shortenContent } from '../../../../helpers/shortenContent'

import './LayoutArticle.scss'
import BEM from '../../../../helpers/BEM'

const b = BEM('LayoutArticle')

type LayoutArticleProps = {
  article: Object,
  articleId: number,
  canDrop: boolean,
  connectDragPreview: Function,
  connectDragSource: Function,
  connectDropTarget: Function,
  hovered: boolean,
  isDragging: boolean,
  layoutArticles: Array<Object>,
  removeArticle: number => Object,
  updateArticle: (number, Object) => Object
}

const LayoutArticle = (props: LayoutArticleProps) => {
  const {
    connectDropTarget,
    connectDragSource,
    hovered,
    canDrop,
    article,
    removeArticle
  } = props

  const getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop) return '#2ecc71'
    else if (hovered && !canDrop) return '#e74c3c'
    else return 'white'
  }

  const checkIfEmpty = (article, backgroundColor, onClickRemove) => {
    return article.content ? (
      <div className={b()} style={{ background: backgroundColor }}>
        <h2 className={b('title')}>{article.title}</h2>
        <button
          className={b('remove')}
          onClick={() => onClickRemove(article.id)}
        >
          Remove
        </button>
        <p className={b('content')}>
          {shortenContent(article.content, 100)}
        </p>
        <small className={b('author')}>{article.author}</small>
        <time className={b('date')}>{article.date}</time>
      </div>
    ) : (
      <div className={b()} style={{ background: backgroundColor }}>
        Container
        <button
          className={b('remove')}
          onClick={() => onClickRemove(article.id)}
        >
          Remove
        </button>
      </div>
    )
  }

  return connectDragSource(
    connectDropTarget(
      checkIfEmpty(article, getHoveredColor(hovered, canDrop), removeArticle)
    )
  )
}

export default flow(
  DropTarget(
    'Article',
    {
      drop(props, monitor) {
        const { articleId } = props

        if (articleId === 2)
          props.updateArticle(props.article.id, monitor.getItem())

        return {
          articleId: articleId
        }
      },

      canDrop(props, monitor) {
        const result = props.layoutArticles.filter(
          article => article.id === monitor.getItem().id
        )
        return props.article.content === '' && result.length === 0
      }
    },
    (connect, monitor) => ({
      connectDropTarget: connect.dropTarget(),
      hovered: monitor.isOver(),
      item: monitor.getItem(),
      canDrop: monitor.canDrop()
    })
  ),
  DragSource(
    'Article',
    {
      beginDrag(props) {
        return props.article
      },

      endDrag(props, monitor) {
        if (monitor.getDropResult() === null) return

        if (monitor.getDropResult() !== props.articleId) {
          props.removeArticle(props.article.id)
        }
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    }))
)(LayoutArticle)
