import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CreatePostPage from '../CreatePost/CreatePostPage/CreatePostPage'
import MainPage from '../MainPage/MainPage/MainPage'

import './App.scss'
import '../../css-grid/grid.scss'

class App extends Component {
  componentDidMount() {
    let url = 'http://localhost:3001/articles';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ articles: data })
      })
  }

  render() {
    return (
      <div>
          <MainPage />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)