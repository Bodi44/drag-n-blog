import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from '../Sidebar'
import Layout from '../Layout'

import './MainPage.scss'
import BEM from '../../helpers/BEM'

const b = BEM('MainPage')

const MainPage = () => (
  <main className={b()}>
    <Sidebar/>
    <Layout/>
  </main>
)

export default DragDropContext(HTML5Backend)(MainPage)