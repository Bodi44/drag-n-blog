// @flow
import React from 'react'
import { Route } from 'react-router-dom'

import MainPage from './MainPage'
import Posts from './Posts'
import WriteBlog from './WriteBlog'
import ViewPost from './ViewPost/ViewPost'

import '../css-grid/grid.scss'

const Routes = () => {
  return (
    <main className={'grid_12'}>
      <Route exact path={'/'} component={MainPage}/>
      <Route path={'/layout'} component={Posts}/>
      <Route path={'/write_blog'} component={WriteBlog}/>
      <Route path={'/view_post'} component={ViewPost}/>
    </main>
  )
}

export default Routes