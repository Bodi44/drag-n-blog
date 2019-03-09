// @flow
import * as React from 'react'
import Header from './Header'

import '../css-grid/grid.scss'

type LayoutProps = {
  children: React.Node
}

const Layout = (props: LayoutProps) => {
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