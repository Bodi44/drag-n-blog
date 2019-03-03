import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import update from 'immutability-helper'

import Article from './Article'

import Database from '../../../Database/Database'

import './Sidebar.scss'

const itemTarget = {
  drop(props, monitor, component) {
    const { containerId } = props

    const result = component.state.articles.filter(item => {
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
      articles: [],
    }
  }

  componentDidMount() {
    fetch(this.props.serverUrl + 'articles')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ articles: json })
      })
  }

  deleteItem = (id) => {
    const dataBase = new Database(this.props.serverUrl + 'articles')
    let newState = this.state.articles.filter(item => item.id !== id)

    this.setState({ articles: newState })
    dataBase.delete(id)
  }

  addItem = (data) => {
    const dataBase = new Database(this.props.serverUrl + 'articles')

    this.setState(update(this.state, {
      articles: {
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
    const { articles } = this.state

    const backgroundColor = this.getHoveredColor(hovered, canDrop)

    return connectDropTarget(
      <aside className={'Sidebar'} style={{ background: backgroundColor }}>
        <ul className={'Sidebar__blog-list'}>
          {articles.map((article) => (
            <Article article={article}
                     key={article.id}
                     containerId={containerId}
                     itemDeleter={this.deleteItem}/>
          ))}
        </ul>
      </aside>,
    )
  }
}

export default DropTarget('Article', itemTarget, collect)(Sidebar)