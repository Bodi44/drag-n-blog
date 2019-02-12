import React, { Component } from 'react'

import '../css-grid/grid.scss'
import './Header.scss'

export default class Header extends Component{
  render() {
    return(
      <header className={'grid_12'}>
        <h1 className={'Header__title'}>Drag`n`Blog</h1>
      </header>
    )
  }
}