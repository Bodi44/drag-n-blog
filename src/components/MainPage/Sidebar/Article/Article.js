// @flow
import React from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { Link } from 'react-router-dom'
import flow from 'lodash/flow'

import { shortenContent } from '../../../../helpers/shortenContent'

import './Article.scss'
import BEM from '../../../../helpers/BEM'

const b = BEM('Article')

type ArticleProps = {
  article: Object,
  containerId: number,
  itemDeleter: number => Object,
  connectDragPreview: Function,
  connectDragSource: Function,
  isDragging: boolean
}

const Article = ({ isDragging, connectDragSource, connectDropTarget, article, itemDeleter }: ArticleProps) => (
  connectDragSource(
    connectDropTarget(
      <li className={b()} style={{ opacity: isDragging ? 0 : 1 }}>
        <h4 className={b('title')}>{article.title}</h4>
        <div className={b('modifiers')}>
          <button
            className={b('remove')}
            onClick={() => itemDeleter(article.id)}
          >
            Remove
          </button>
          <Link
            to={{ pathname: `/edit-article/${article.id}` }}
            className={b('edit')}
          >
            Edit
          </Link>
        </div>
        <p className={b('content')}>
          {shortenContent(article.content, 50)}
        </p>
        <small className={b('author')}>{article.author}</small>
        <time className={b('date')}>{article.date}</time>
      </li>)
  )
)

export default flow(
  DragSource(
    'Article',
    {
      beginDrag(props) {
        return props.article
      },

      endDrag(props, monitor) {
        const dropResult = monitor.getDropResult()

        if (dropResult && dropResult.containerId !== props.containerId) {
          props.itemDeleter(props.article.id)
        }
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget(
    'Article',
    {
      canDrop() {
        return false
      },
      hover(props, monitor) {
        const draggedId = monitor.getItem().id
        const overId = props.article.id
        if (draggedId !== overId) {
          const { article: dragArticle, index } = props.findArticle(draggedId)
          const { index: overIndex } = props.findArticle(overId)

          props.moveArticle(index, overIndex, dragArticle)
        }
      }
    },
    connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )
)(Article)
