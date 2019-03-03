import React from 'react'
import { Route } from 'react-router-dom'

import MainPage from './MainPage/MainPage/MainPage'
import Posts from './Posts'
import WriteBlog from './WriteBlog'
import ViewPostPage from './ViewPost/ViewPostPage/ViewPostPage'

import '../css-grid/grid.scss'

const Routes = () => {
  return (
    <main className={'grid_12'}>
      <Route exact path={'/'} component={MainPage}/>
      <Route path={'/layout'} component={Posts}/>
      <Route path={'/write_blog'} component={WriteBlog}/>
      <Route path={'/view_post'} component={ViewPostPage}/>
    </main>
  )
}

export default Routes