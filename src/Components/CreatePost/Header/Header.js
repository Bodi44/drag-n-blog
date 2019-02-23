import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../../css-grid/grid.scss'
import './Header.scss'

class Header extends Component {
  render() {
    return (
      <div className={'grid_12 LayoutHeader'}>
        <Link to={'/'}>
          <div className={'Header__placeholder'}>
            <div className={'Header__placeholder-logo'}>
              <h1>Drag'n'Blog</h1>
              <p>flexible-blog</p>
            </div>
            <p>Draft</p>
          </div>
        </Link>
      </div>
    )
  }
}

export default Header