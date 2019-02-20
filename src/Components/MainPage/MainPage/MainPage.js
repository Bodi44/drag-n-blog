import React from 'react'

import Sidebar from '../Sidebar/Sidebar'
import BlogTable from '../BlogTable/BlogTable'

import { postList, blogContainers } from '../../../helpers/initialData'

import '../../../css-grid/grid.scss'

const MainPage = () => {
  return(
    <div className={'container_12'}>
      <Sidebar id={1} items={postList}/>
      <BlogTable id={2} items={blogContainers}/>
    </div>
  )
}

export default MainPage