import React from 'react'
import Routes from './Routes'

import Header from './Header'

import '../css-grid/grid.scss'

const Layout = () => (
  <div className={'grid'}>
    <header className={'grid__cell_12'}>
      <Header/>
    </header>

    <Routes/>
  </div>
)

export default Layout