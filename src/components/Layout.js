import React from 'react'
import Routes from './Routes'

import Header from './Header'

import '../css-grid/grid.scss'

const Layout = () => {
  return (
    <div className={'grid'}>
      <header className={'grid__cell--12'}>
        <Header/>
      </header>
      <Routes/>
    </div>
  )
}

export default Layout