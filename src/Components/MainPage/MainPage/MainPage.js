import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import MainHeader from '../MainHeader/MainHeader'
import Sidebar from '../Sidebar/Sidebar'
import BlogTable from '../BlogTable/BlogTable'

import './MainPage.scss'
import '../../../css-grid/grid.scss'

const jsonServerUrl = 'http://localhost:3001/'

const MainPage = () => {
  return (
    <div className={'container_12 MainPage'}>
      <MainHeader/>
      <main className={'grid_12 MainPage__content'}>
        <Sidebar containerId={1} serverUrl={jsonServerUrl}/>
        <BlogTable containerId={2} serverUrl={jsonServerUrl}/>
      </main>
    </div>
  )
}

export default DragDropContext(HTML5Backend)(MainPage)