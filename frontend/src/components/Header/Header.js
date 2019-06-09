import React from 'react'
import { NavLink, Link, Route } from 'react-router-dom'

import './Header.scss'
import BEM from '../../helpers/BEM'

const b = BEM('Header')

const MainButton = () => (
  <Link to={'/edit-article'} className={b('write-blog')}>
    <span className={b('write-blog_centered')}>Write New Blog!</span>
  </Link>
)

const Header = () => (
  <div className={b()}>
    <header className={b('header')}>
      <NavLink className={b('left')} to={'/'} children={'Home'}>
        <h1 className={b('logo-main')}>Drag'n'Blog</h1>
        <p className={b('logo-secondary')}>flexible-blog</p>
      </NavLink>

      <div className={b('right')}>
        <form action="" className={b('search')}>
          <input className={b('input')} placeholder="Search"/>
        </form>
        <Route exact path={'/'} component={MainButton}/>
        <Route exact path={'/layout'} component={MainButton}/>
        <Link to={'/'} className={b('user')} children={'User'}/>
      </div>
    </header>
  </div>
)

export default Header
