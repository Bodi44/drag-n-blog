import React from 'react'

import PageLayout from './PageLayout/PageLayout'

import '../../css-grid/grid.scss'

const ViewLayout = (props) => {
  const { serverUrl } = props

  return(
    <div className={'container_12'}>
      <PageLayout serverUrl={serverUrl}/>
    </div>
  )
}

export default ViewLayout