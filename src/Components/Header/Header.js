import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import './Header.scss'
import '../../css-grid/grid.scss'

const Header = () => {
  return (
    <div className={'Header'}>
      <div className={'Header__top-content'}>
        <div className={'Header__top-content_left'}>
          <h1 className={'Header__logo Header__logo_main'}>Drag'n'Blog</h1>
          <p className={'Header__logo Header__logo_secondary'}>flexible-blog</p>
        </div>
        <div className={'Header__top-content_right'}>
          <form action="" className={'Header__search'}>
            <input/>
          </form>
          <button className={'Header__write-blog'}>Write New Blog!</button>
          <Link to={'/'} className={'Header__user'}>User</Link>
        </div>
      </div>
      <nav className={'Header__navigation'}>
        <NavLink
          to={'/home'}
          className={'Header__nav-link'}
          activeClassName={'Header__nav-link_active'}
          children={'Home'}/>
        <NavLink
          to={'/layout'}
          className={'Header__nav-link'}
          activeClassName={'Header__nav-link_active'}
          children={'Posts'}/>
      </nav>
    </div>
  )
}

export default Header