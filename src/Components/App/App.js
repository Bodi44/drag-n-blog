import React, { Component } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'

import MainPage from '../MainPage/MainPage/MainPage'
import ViewLayout from '../ViewLayout/ViewLayout'
import CreatePostPage from '../CreatePost/CreatePostPage/CreatePostPage'
import ViewPostPage from '../ViewPost/ViewPostPage/ViewPostPage'

import './App.scss'
import '../../css-grid/grid.scss'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path={"/"} component={MainPage}/>
          <Route path={"/layout"} component={ViewLayout}/>
          <Route path={"/create_post"} component={CreatePostPage}/>
          <Route path={"/view_post"} component={ViewPostPage}/>
        </div>
      </Router>
    )
  }
}

export default App