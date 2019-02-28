import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Header from './Header/Header'
import MainPage from './MainPage/MainPage/MainPage'
import ViewLayout from './ViewLayout/ViewLayout'
import CreatePostPage from './CreatePost/CreatePostPage/CreatePostPage'
import ViewPostPage from './ViewPost/ViewPostPage/ViewPostPage'
import EditPost from './EditPost/EditPost'

import '../css-grid/grid.scss'

const App = () => (
  <Router>
    <div className={'container_12'}>
      <header className={'grid_12'}>
        <Header/>
      </header>
      <div>
        <Redirect from={'/'} to={'/home'}/>
        <Route exact path={'/home'} component={MainPage}/>
        <Route path={'/layout'} component={ViewLayout}/>
        <Route path={'/create_post'} component={CreatePostPage}/>
        <Route path={'/view_post'} component={ViewPostPage}/>
        <Route path={'/edit_post'} component={EditPost}/>
      </div>
    </div>
  </Router>
)

export default App
