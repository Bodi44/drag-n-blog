import React, { Component } from 'react'

import Header from '../Header/Header'
import Post from '../Post/Post'

import '../../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/';

const ViewPostPage = (props) =>{
  const {data} = props.location.state
  console.log(data)
  return(
    <div className={'container_12'}>
      <Header />
      <Post serverUrl={jsonServerUrl} article={data}/>
    </div>
  )
};

export default ViewPostPage