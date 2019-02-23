import React from 'react'

import LayoutHeader from './LayoutHeader/LayoutHeader'
import PageLayout from './PageLayout/PageLayout'

import '../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/'

const ViewLayout = () => {
  return(
    <div className={'container_12'}>
      <LayoutHeader />
      <PageLayout serverUrl={jsonServerUrl} />
    </div>
  )
}

export default ViewLayout