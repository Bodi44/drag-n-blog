import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import CreatePostPage from '../CreatePost/CreatePostPage/CreatePostPage'
import MainPage from '../MainPage/MainPage/MainPage'

import './App.scss'
import '../../css-grid/grid.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [],
      layoutContainers: [],
    }
  }

  componentDidMount() {
    let url = 'http://localhost:3001/'
    fetch(url + 'articles')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ articles: json })
      })
    fetch(url + 'layoutContainers')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ layoutContainers: json })
      })
  }

  render() {
    const { articles, layoutContainers } = this.state

    if (!articles && !layoutContainers) return <div>Data is loading...</div>

    return (
      <div>
        <MainPage articles={articles} layoutContainers={layoutContainers}/>
        {/*<CreatePostPage />*/}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)