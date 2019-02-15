import React, { Component } from 'react'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'

import Item from '../Item/Item'

import './BlogTable.scss'

const itemTarget = {
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

class BlogTable extends Component {
  state = {
    items: this.props.items,
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
    const { canDrop, isOver, connectDropTarget } = this.props
    const isActive = canDrop && isOver
    const backgroundColor = isActive ? 'lightgreen' : '#FFF'

    return connectDropTarget(
      <div className={'grid_9 BlogTable'}>
        <ul className={'grid_7 BlogTable__article'}>
          {items.map((item, index) => (
            <Item key={items.id}
                  index={index}
                  containerId={this.props.id}
                  item={item}
                  removeItem={this.removeItem}
                  moveItem={this.moveItem}
            />
          ))}
        </ul>
      </div>,
    )
  }
}

export default DropTarget('Item', itemTarget, collect)(BlogTable)