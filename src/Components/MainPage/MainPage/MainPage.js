import React from 'react'

import Sidebar from '../Sidebar/Sidebar'
import BlogTable from '../BlogTable/BlogTable'

import '../../../css-grid/grid.scss'

const MainPage = (props) => {
  const { articles, layoutContainers } = props
  return (
    <div className={'container_12'}>
      <Sidebar id={1} items={articles}/>
      <BlogTable id={2} items={layoutContainers}/>
    </div>
  )
}

export default MainPage