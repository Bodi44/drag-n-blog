import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from './Sidebar'
import BlogTable from './BlogTable'

import './MainPage.scss'
import BEM from '../../helpers/BEM'

const b = BEM('MainPage')

const MainPage = () => (
  <main className={b()}>
    <Sidebar containerId={1}/>
    <BlogTable containerId={2}/>
  </main>
)

export default DragDropContext(HTML5Backend)(MainPage)