// @flow
import React from 'react'
import { DragSource } from 'react-dnd'

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
    connectDragSource,
    article,
    removeArticle,
    updateArticle
  } = props

  return connectDragSource(
    <div className={b()}>
      <h2 className={b('title')}>{article.title}</h2>
      <button
        className={b('remove')}
        onClick={() => {
          updateArticle(article.id, {
            title: article.title,
            content: article.content,
            author: article.author,
            tags: article.tags,
            inLayout: false
          })
          removeArticle(article.id)
        }}
      >
        Remove
      </button>
      <p className={b('content')}>
        {shortenContent(article.content, 100)}
      </p>
      <small className={b('author')}>{article.author}</small>
      <time className={b('date')}>{article.date}</time>
    </div>
  )
}

export default DragSource(
  'Article',
  {
    beginDrag(props) {
      return props.article
    },

    endDrag(props, monitor) {
      if (monitor.getDropResult() === null) return
      props.removeArticle(props.article.id)
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(LayoutArticle)
