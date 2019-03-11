import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import flow from 'lodash/flow'

import './LayoutArticle.scss'

const itemSource = {
  beginDrag(props) {
    return props.article
  },

  endDrag(props, monitor) {
    if (monitor.getDropResult() === null) return

    if (monitor.getDropResult() !== props.articleId) {
      props.removeArticle(props.article.id)
    }
  },
}

const itemTarget = {
  drop(props, monitor, component) {
    const { articleId } = props
    console.log(props.article.id, monitor.getItem().id)

    if (articleId === 2)
      component.addItemToContainer(
        props.article.id,
        monitor.getItem(),
        props.serverUrl,
      )

    return {
      articleId: articleId,
    }
  },

  canDrop(props, monitor) {
    const result = props.layoutArticles.filter(
      article => article.id === monitor.getItem().id,
    )
    return props.article.content === '' && result.length === 0
  },
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
    canDrop: monitor.canDrop(),
  }
}

class LayoutArticle extends Component {
  addItemToContainer = (id, data) => {
    this.props.updateArticle(id, data)
  }

  getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop) return '#2ecc71'
    else if (hovered && !canDrop) return '#e74c3c'
    else return 'white'
  }

  checkIfEmpty = (article, backgroundColor, onClickRemove) => {
    return article.content ? (
      <div className={'LayoutArticle'} style={{ background: backgroundColor }}>
        <h2 className={'LayoutArticle__title'}>{article.title}</h2>
        <button
          className={'LayoutArticle__remove'}
          onClick={() => onClickRemove(article.id)}
        >
          Remove
        </button>
        <p className={'LayoutArticle__content'}>
          {article.content
            .split(' ')
            .slice(0, 100)
            .join(' ')}
        </p>
        <small className={'LayoutArticle__author'}>{article.author}</small>
        <time className={'LayoutArticle__date'}>{article.date}</time>
      </div>
    ) : (
      <div className={'LayoutArticle'} style={{ background: backgroundColor }}>
        Container
        <button
          className={'LayoutArticle__remove'}
          onClick={() => onClickRemove(article.id)}
        >
          X
        </button>
      </div>
    )
  }

  render() {
    const {
      connectDropTarget,
      connectDragSource,
      hovered,
      canDrop,
      article,
    } = this.props
    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    return connectDragSource(
      connectDropTarget(
        this.checkIfEmpty(
          article,
          backgroundColor,
          this.props.removeArticle,
        ),
      ),
    )
  }
}

export default flow(
  DropTarget('Article', itemTarget, collect),
  DragSource('Article', itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
)(LayoutArticle)