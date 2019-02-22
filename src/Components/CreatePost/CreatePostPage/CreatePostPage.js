import React, { Component } from 'react'

import Header from '../Header/Header'
import Form from '../Form/Form'

import '../../../css-grid/grid.scss'

const CreatePostPage = () =>{
  return(
    <div className={'container_12'}>
      <Header />
      <Form />
    </div>
  )
}

export default CreatePostPage