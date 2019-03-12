import React from 'react'
import Routes from './Routes'

import Header from './Header'

import '../css-grid/grid.scss'

const Layout = () => {
  return (
    <div className={'container_12'}>
      <header className={'grid_12'}>
        <Header/>
      </header>
      <Routes/>
    </div>
  )
}

export default Layout