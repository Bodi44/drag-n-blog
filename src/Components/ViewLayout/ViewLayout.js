import React from 'react'

import PageLayout from './PageLayout/PageLayout'

import '../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/'

const ViewLayout = () => {
  return(
    <div className={'container_12'}>
      <PageLayout serverUrl={jsonServerUrl}/>
    </div>
  )
}

export default ViewLayout