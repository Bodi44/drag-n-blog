import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

import Database from '../../../Database/Database'

import './Container.scss'
import '../../../css-grid/grid.scss'

const itemTarget = {
  drop(props, monitor, component) {
    const { containerId } = props

    if (containerId === 2)
      component.addItemToContainer(props.container.id, monitor.getItem(), props.serverUrl)

    return {
      containerId: containerId,
    }
  },
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  }
}

class Container extends Component {
  addItemToContainer = (id, data, url) => {
    const dataBase = new Database(url + 'layoutContainers')
    this.props.containerUpdater(id, data, this.props.index)

    dataBase.update(id, data)
  }

  checkIfEmpty = (container, backgroundColor) => {
    return container.content ?
      (<div className={'Container'} style={{ background: backgroundColor }}>
        <h2 className={'Container__title'}>{container.title}</h2>
        <button className={'Container__remove'}>X</button>
        <p className={'Container__content'}>{container.content}</p>
        <small className={'Container__author'}>{container.author}</small>
        <time className={'Container__date'}>{container.date}</time>
      </div>)
      : (<div className={'Container'} style={{ background: backgroundColor }}>
        Container
        <button className={'Container__remove'}>X</button>
      </div>)
  }

  render() {
    const { connectDropTarget, hovered, container } = this.props
    const backgroundColor = hovered ? 'lightgreen' : 'white'

    return connectDropTarget(
      this.checkIfEmpty(container, backgroundColor),
    )
  }
}

export default DropTarget('Item', itemTarget, collect)(Container)