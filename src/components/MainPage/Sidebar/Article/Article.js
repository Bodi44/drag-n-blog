// @flow
import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { Link } from 'react-router-dom'

import { shortenContent } from '../../../../helpers/shortenContent'

import './Article.scss'

const itemSource = {
  beginDrag(props) {
    return props.article
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.containerId !== props.containerId) {
      props.itemDeleter(props.article.id)
    }
  }
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

type ArticleProps = {
  article: Object,
  containerId: number,
  itemDeleter: number => Object,
  connectDragPreview: Function,
  connectDragSource: Function,
  isDragging: boolean
}

class Article extends Component<ArticleProps> {
  render() {
    const { isDragging, connectDragSource, article } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <li className={'Article'} style={{ opacity }}>
        <h4 className={'Article__title'}>{article.title}</h4>
        <div className={'Article__modifiers'}>
          <button
            className={'Article__remove'}
            onClick={() => this.props.itemDeleter(article.id)}
          >
            Remove
          </button>
          <Link
            to={{ pathname: `/edit-article/${article.id}` }}
            className={'Article__edit'}
          >
            Edit
          </Link>
        </div>
        <p className={'Article__content'}>
          {shortenContent(article.content, 50)}
        </p>
        <small className={'Article__author'}>{article.author}</small>
        <time className={'Article__date'}>{article.date}</time>
      </li>
    )
  }
}

export default DragSource('Article', itemSource, collect)(Article)
