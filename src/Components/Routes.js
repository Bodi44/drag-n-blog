import React from 'react'
import { Route } from 'react-router-dom'
import MainPage from './MainPage/MainPage/MainPage'
import ViewLayout from './ViewLayout/ViewLayout'
import WriteBlog from './WriteBlog/WriteBlog'
import ViewPostPage from './ViewPost/ViewPostPage/ViewPostPage'
import EditPost from './EditPost/EditPost'

import '../css-grid/grid.scss'

const Routes = () => {
  return (
    <main className={'grid_12'}>
      <Route exact path={'/'} component={MainPage}/>
      <Route path={'/layout'} component={ViewLayout}/>
      <Route path={'/write_blog'} component={WriteBlog}/>
      <Route path={'/view_post'} component={ViewPostPage}/>
      <Route path={'/edit_post'} component={EditPost}/>
    </main>
  )
}

export default Routes