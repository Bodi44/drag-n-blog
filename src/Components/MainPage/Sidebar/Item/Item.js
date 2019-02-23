import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

import './Item.scss'
import '../../../../css-grid/grid.scss'

const itemSource = {
  beginDrag(props) {
    return props.item
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.containerId !== props.containerId) {
      props.itemDeleter(props.item.id)
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

class Item extends Component {
  render() {
    const { isDragging, connectDragSource, item } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      <li className={'Item'} style={{ opacity }}>
        <h4 className={'Item__title'}>{item.title}</h4>
        <div className={'Item__modifiers'}>
          <button className={'Item__remove'} onClick={() => this.props.itemDeleter(item.id)}>X</button>
          <button className={'Item__edit'}>Edit</button>
        </div>
        <p className={'Item__content'}>{item.content}</p>
        <small className={'Item__author'}>{item.author}</small>
        <time className={'Item__date'}>{item.date}</time>
      </li>,
    )
  }
}

export default DragSource('Item', itemSource, collect)(Item)