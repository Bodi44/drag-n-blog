import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from '../Sidebar/Sidebar'
import BlogTable from '../BlogTable/BlogTable'

import './MainPage.scss'
import '../../../css-grid/grid.scss'

const MainPage = (props) => {
  const { serverUrl } = props
  return (
    <div className={'container_12 MainPage'}>
      <Sidebar id={1}  serverUrl={serverUrl}/>
      <BlogTable id={2} serverUrl={serverUrl}/>
    </div>
  )
}

export default DragDropContext(HTML5Backend)(MainPage)