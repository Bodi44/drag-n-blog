import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { Link } from 'react-router-dom'

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
  },
}

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Article extends Component {
  render() {
    const { isDragging, connectDragSource, article } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <li className={'Article'} style={{ opacity }}>
        <h4 className={'Article__title'}>{article.title}</h4>
        <div className={'Article__modifiers'}>
          <button className={'Article__remove'} onClick={() => this.props.itemDeleter(article.id)}>Remove</button>
          <Link to={{ pathname: '/write_blog', state: { data: article } }}
                className={'Article__edit'}>Edit</Link>
        </div>
        <p className={'Article__content'}>{article.content.split(' ').slice(0, 50).join(' ')}</p>
        <small className={'Article__author'}>{article.author}</small>
        <time className={'Article__date'}>{article.date}</time>
      </li>,
    )
  }
}

export default DragSource('Article', itemSource, collect)(Article)