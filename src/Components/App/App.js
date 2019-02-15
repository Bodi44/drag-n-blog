import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from '../Sidebar/Sidebar'
import BlogTable from '../BlogTable/BlogTable'
import { Item1, Item2 } from '../../helpers/initialData'

import './App.scss'
import '../../css-grid/grid.scss'

class App extends Component {
  componentDidMount() {
    let url = 'http://localhost:3001/articles'
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ articles: data })
      })
  }

  render() {
    return (
      <div className={'container_12 Blog'}>
        <Sidebar id={1} items={Item1}/>
        <BlogTable id={2} items={Item2}/>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)