import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import MainPage from '../MainPage/MainPage/MainPage'

import './App.scss'
import '../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/'

class App extends Component {
  render() {
    return (
      <div>
        <MainPage serverUrl={jsonServerUrl}/>
        {/*<CreatePostPage />*/}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)