import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper'
import { Link } from 'react-router-dom'

import Item from './Item/Item'

import Database from '../../../Database/Database'

import '../../../css-grid/grid.scss'
import './Sidebar.scss'

const itemTarget = {
  drop(props, monitor, component) {
    const { containerId } = props

    const result = component.state.items.filter(item => {
      return item.id === monitor.getItem().id
    })

    if (result.length === 0)
      component.addItem(monitor.getItem())

    return {
      containerId: containerId,
    }
  },

  canDrop(props, monitor) {
    return (monitor.getItem().content !== '')
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

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    fetch(this.props.serverUrl + 'articles')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ items: json })
      })
  }

  deleteItem = (id) => {
    const dataBase = new Database(this.props.serverUrl + 'articles')
    let newState = this.state.items.filter(item => item.id !== id)

    this.setState({ items: newState })
    dataBase.delete(id)
  }

  addItem = (data) => {
    const dataBase = new Database(this.props.serverUrl + 'articles')

    this.setState(update(this.state, {
      items: {
        $push: [data],
      },
    }))

    dataBase.create(data.id, data.title, data.content, data.author)
  }

  getHoveredColor = (hovered, canDrop) => {
    if (hovered && canDrop)
      return '#2ecc71'
    else if (hovered && !canDrop)
      return '#e74c3c'
    else
      return '#ecf0f1'
  }

  render() {
    const { connectDropTarget, hovered, canDrop, containerId } = this.props
    const { items } = this.state

    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    return connectDropTarget(
      <aside className={'grid_4 Sidebar'} style={{ background: backgroundColor }}>
        <ul className={'Sidebar__blog-list'}>
          {items.map((item) => (
            <Item item={item}
                  key={item.id}
                  containerId={containerId}
                  itemDeleter={this.deleteItem}/>
          ))}
        </ul>
        <div className={'Sidebar__add-blog'}>
          <Link to={'/create_post'}>Write New Blog!</Link>
        </div>
      </aside>,
    )
  }
}

export default DropTarget('Item', itemTarget, collect)(Sidebar)