import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

import Database from '../../../../Database/Database'

import './Container.scss'
import '../../../../css-grid/grid.scss'

const itemTarget = {
  drop(props, monitor, component) {
    const { containerId } = props

    if (containerId === 2)
      component.addItemToContainer(props.container.id, monitor.getItem(), props.serverUrl)

    return {
      containerId: containerId,
    }
  },

  canDrop(props) {
    return props.container.content === ''
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
    if(hovered && canDrop)
      return 'lightgreen'
    else if(hovered && !canDrop)
      return 'red'
    else
      return 'white'
  }

  checkIfEmpty = (container, backgroundColor, onClickRemove) => {
    return container.content ?
      (<div className={'Container'} style={{ background: backgroundColor }}>
        <h2 className={'Container__title'}>{container.title}</h2>
        <button className={'Container__remove'} onClick={() => onClickRemove(container.id)}>X</button>
        <p className={'Container__content'}>{container.content}</p>
        <small className={'Container__author'}>{container.author}</small>
        <time className={'Container__date'}>{container.date}</time>
      </div>)
      : (<div className={'Container'} style={{ background: backgroundColor }}>
        Container
        <button className={'Container__remove'} onClick={() => onClickRemove(container.id)}>X</button>
      </div>)
  }

  render() {
    const { connectDropTarget, hovered, canDrop, container } = this.props
    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    // const canDropColor = canDrop ? 'red' : 'lightgreen'

    return connectDropTarget(
      this.checkIfEmpty(container, backgroundColor, this.props.containerRemover),
    )
  }
}

export default DropTarget('Item', itemTarget, collect)(Container)