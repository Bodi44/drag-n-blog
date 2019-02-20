import React, { Component } from 'react'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'

import Item from '../Item/Item'

import './Container.scss'
import '../../../css-grid/grid.scss'

const itemTarget = {
  canDrop(props, monitor) {
    // console.log(props.container, monitor.getItem())
    return true
  },

  drop(props, monitor, component) {
    const { id } = props
    const sourceObj = monitor.getItem()
    if (id !== sourceObj.containerId) component.pushItem(sourceObj.item)

    return {
      containerId: id,
    }
  },
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }
}


class Container extends Component {
  state = {
    items: this.props.container,
  }

  pushItem = (item) => {
    this.setState(update(this.state, {
      items: {
        $push: [item],
      },
    }))
  }

  removeItem = (index) => {
    this.setState(update(this.state, {
      items: {
        $splice: [[index, 1]],
      },
    }))
  }

  moveItem = (dragIndex, hoverIndex) => {
    const { items } = this.state
    const dragItem = items[dragIndex]

    this.setState(update(this.state, {
      items: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragItem],
        ],
      },
    }))
  }

  render() {
    const { items } = this.state
    const { canDrop, isOver, connectDropTarget, index } = this.props
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? '#ecf0f1' : '#FFF'

    return connectDropTarget(
      <ul onDrop={() => this.props.onDropHandler(items, index)}
          className={'grid_7 Container'}
          style={{ background: backgroundColor }}>
        {items.map((item, index) => (
          <Item key={items.id}
                index={index}
                containerId={this.props.id}
                item={item}
                removeItem={this.removeItem}
                moveItem={this.moveItem}
          />
        ))}
      </ul>,
    )
  }
}

export default DropTarget('Item', itemTarget, collect)(Container)