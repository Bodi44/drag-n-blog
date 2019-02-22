import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import MainPage from '../MainPage/MainPage/MainPage'
import ViewLayout from '../ViewLayout/ViewLayout'

import './App.scss'
import '../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/'

class App extends Component {
  render() {
    return (
      <div>
        {/*<MainPage serverUrl={jsonServerUrl}/>*/}
        <ViewLayout serverUrl={jsonServerUrl}/>
      </div>
    )
  }
}

export default App