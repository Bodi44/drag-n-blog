import React, { Component } from 'react'

import Header from '../Header/Header'
import Post from '../Post/Post'

import '../../../css-grid/grid.scss'

const ViewPostPage = () =>{
  return(
    <div className={'container_12'}>
      <Header />
      <Post />
    </div>
  )
}

export default ViewPostPage