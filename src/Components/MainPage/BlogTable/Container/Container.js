import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import flow from 'lodash/flow'

import Database from '../../../../Database/Database'

import './Container.scss'
import '../../../../css-grid/grid.scss'

const itemSource = {
  beginDrag(props) {
    return props.container
  },

  endDrag(props, monitor) {
    if (monitor.getDropResult() === null)
      return

    if (monitor.getDropResult() !== props.containerId) {
      props.containerRemover(props.container.id)
    }
  },
}


const itemTarget = {
  drop(props, monitor, component) {
    const { containerId } = props

    if (containerId === 2)
      component.addItemToContainer(props.container.id, monitor.getItem(), props.serverUrl)

    return {
      containerId: containerId,
    }
  },

  canDrop(props, monitor) {
    const result = props.containerList.filter((item) => item.id === monitor.getItem().id)
    return (props.container.content === '' && result.length === 0)
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

class Container extends Component {
  addItemToContainer = (id, data, url) => {
    const dataBase = new Database(url + 'layoutContainers')

    this.props.containerUpdater(id, data, this.props.index)
    dataBase.update(id, data)
  }

  getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop)
      return '#2ecc71'
    else if (hovered && !canDrop)
      return '#e74c3c'
    else
      return 'white'
  }

  checkIfEmpty = (container, backgroundColor, onClickRemove) => {
    return container.content ?
      (<div className={'Container'} style={{ background: backgroundColor }}>
        <h2 className={'Container__title'}>{container.title}</h2>
        <button className={'Container__remove'} onClick={() => onClickRemove(container.id)}>X</button>
        <p className={'Container__content'}>{container.content.split(' ').slice(0, 100).join(' ')}</p>
        <small className={'Container__author'}>{container.author}</small>
        <time className={'Container__date'}>{container.date}</time>
      </div>)
      : (<div className={'Container'} style={{ background: backgroundColor }}>
        Container
        <button className={'Container__remove'} onClick={() => onClickRemove(container.id)}>X</button>
      </div>)
  }

  render() {
    const { connectDropTarget, connectDragSource, hovered, canDrop, container } = this.props
    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    return connectDragSource(
      connectDropTarget(
        this.checkIfEmpty(container, backgroundColor, this.props.containerRemover),
      ))
  }
}

export default flow(
  DropTarget('Item', itemTarget, collect),
  DragSource('Item', itemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
)(Container)