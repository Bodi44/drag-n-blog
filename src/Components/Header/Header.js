import React from 'react'
import { NavLink, Link, Route } from 'react-router-dom'

import './Header.scss'

const MainButton = () => (
  <Link to={'/write_blog'} className={'Header__write-blog'}>
    <span className={'Header__write-blog_centered'}>Write New Blog!</span>
  </Link>
)

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
            <input
              className={'Header__input'}
              placeholder="Search"
            />
          </form>
          <Route exact path={'/'} component={MainButton}/>
          <Route exact path={'/layout'} component={MainButton}/>
          <Link to={'/'} className={'Header__user'}>User</Link>
        </div>
      </div>
      <nav className={'Header__navigation'}>
        <NavLink
          exact
          to={'/'}
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