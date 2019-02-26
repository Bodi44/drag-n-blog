import React from 'react'

import Header from '../CreatePostHeader/CreatePostHeader'
import Form from '../Form/Form'

import '../../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/';

const CreatePostPage = () =>{
  return(
    <div className={'container_12'}>
      <Header />
      <Form serverUrl={jsonServerUrl}/>
    </div>
  )
};

export default CreatePostPage