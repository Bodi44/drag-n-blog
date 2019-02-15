import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import flow from 'lodash/flow'

import './Item.scss'
import '../../css-grid/grid.scss'

const itemSource = {
  beginDrag(props) {
    return {
      index: props.index,
      id: props.containerId,
      item: props.item,
    }
  },

  endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()

    if (dropResult && dropResult.containerId !== item.containerId)
      props.removeItem(item.index)
  },
}

const itemTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    const sourceTargetList = monitor.getItem().containerId

    if (dragIndex === hoverIndex) return
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    const clientOffset = monitor.getClientOffset()
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY)
      return

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      return

    if (props.containerId === sourceTargetList) {
      props.moveItem(dragIndex, hoverIndex)
      monitor.getItem().index = hoverIndex
    }
  },
}

class Item extends Component {
  render() {
    const { isDragging, connectDragSource, connectDropTarget, item } = this.props
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <li className={'Item'}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
          <small>{item.author}</small>
          <time>{item.time}</time>
        </li>,
      ),
    )
  }
}

export default flow(
  DropTarget('Item', itemTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragSource('Item', itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
)(Item)