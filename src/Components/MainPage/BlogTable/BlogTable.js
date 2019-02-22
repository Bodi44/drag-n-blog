import React, { Component } from 'react'
import update from 'immutability-helper'

import Container from '../Container/Container'

import { generateUniqueId } from '../../../helpers/generateUniqueId'
import Database from '../../../Database/Database'

import './BlogTable.scss'
import '../../../css-grid/grid.scss'

class BlogTable extends Component {
  state = {
    items: [],
  }

  componentDidMount() {
    fetch(this.props.serverUrl + 'layoutContainers')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ items: json })
      })
  }

  addContainer = () => {
    const dataBase = new Database(this.props.serverUrl + 'layoutContainers')

    const newItem = {
      title: "",
      content: "",
      date: Database.dateToString(new Date()),
      author: "",
      id: generateUniqueId()
    }

    this.setState(update(this.state, {
      items:{
        $push: [newItem]
      }
    }))

    dataBase.create(newItem.id, newItem.title, newItem.content, newItem.author)
  }

  updateContainer = (id, data) => {
    const newState = Object.assign({}, this.state.items)

    Object.keys(newState).forEach(key => {
      if(newState[key].id === id){
        newState[key].title = data.title
        newState[key].content = data.content
        newState[key].date = Database.dateToString(new Date())
        newState[key].author = data.author
      }
    })

    this.setState({newState})
  }

  render() {
    const { serverUrl, id } = this.props
    const { items } = this.state

    return (
      <div className={'grid_8 BlogTable'}>
        {items.map(item => (
          <Container
            container={item}
            containerId={id}
            key={item.id}
            serverUrl={serverUrl}
            containerUpdater={this.updateContainer}/>
        ))}
        <button className={'BlogTable__add-container'} onClick={this.addContainer}>Add container</button>
      </div>
    )
  }
}

export default BlogTable