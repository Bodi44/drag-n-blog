import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from './Sidebar'
import BlogTable from './BlogTable'

import './MainPage.scss'

const MainPage = () => {
  return (
    <main className={'MainPage'}>
      <Sidebar containerId={1}/>
      <BlogTable containerId={2}/>
    </main>
  )
}

export default DragDropContext(HTML5Backend)(MainPage)