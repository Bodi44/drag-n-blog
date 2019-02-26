import React from 'react'

import EditForm from './EditForm/EditForm'

import '../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/'

const EditPost = (props) => {
  const { data } = props.location.state

  return (
    <div className={'container_12'}>
      <EditForm serverUrl={jsonServerUrl} data={data}/>
    </div>
  )
}

export default EditPost