import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import MainPage from '../MainPage/MainPage/MainPage'
import ViewLayout from '../ViewLayout/ViewLayout'

import './App.scss'
import '../../css-grid/grid.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={"/"} component={MainPage}/>
          <Route path={"/layout"} component={ViewLayout}/>
        </div>
      </Router>
    )
  }
}

export default App