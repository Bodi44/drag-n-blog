import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import '../../../css-grid/grid.scss'
import '../../MainPage/MainHeader/Header.scss'

class Header extends Component {
  render() {
    return (
      <div className={'grid_12 Header'}>
        <div className={'grid_2 Header__logo Header__logo_create'}>
          <h1 className={'logo__top'}>Drag'n'Blog</h1>
          <p className={'logo__bottom'}>flexible-blog</p>
        </div>
        <nav className={'Header__navigation'}>
          <NavLink
            to={'/'}
            className={'navigation__item'}>Home</NavLink>
          <NavLink
            to={'/layout'}
            className={'navigation__item'}>ViewArticle</NavLink>
        </nav>
      </div>
    )
  }
}

export default Header