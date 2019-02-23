import React, { Component } from 'react'

import Item from './Item/Item'

import '../../../css-grid/grid.scss'
import './Sidebar.scss'
import Database from '../../../Database/Database'

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

  render() {
    const { items } = this.state

    return (
      <aside className={'grid_4 Sidebar'}>
        <ul className={'Sidebar__blog-list'}>
          {items.map((item) => (
            <Item item={item}
                  key={item.id}
                  containerId={this.props.id}
                  itemDeleter={this.deleteItem}/>
          ))}
        </ul>
        <div className={'Sidebar__add-blog'}>
          <a href={'/create_post'}>Write New Blog!</a>
        </div>
      </aside>
    )
  }
}

export default Sidebar