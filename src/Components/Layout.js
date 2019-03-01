import React from 'react'

import Header from './Header'

import '../css-grid/grid.scss'

const Layout = (props) => {
  return (
    <div className={'container_12'}>
      <header className={'grid_12'}>
        <Header/>
      </header>
        {props.children}
    </div>
  )
}

export default Layout