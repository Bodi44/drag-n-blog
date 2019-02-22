import React from 'react'
import {Link} from 'react-router-dom'

import './Header.scss'
import '../../../css-grid/grid.scss'

const Header = () => {
  return(
    <header className={'grid_12 Header'}>
      <Link to={'/layout'} className={'Header__view-layout'}>View Layout</Link>
    </header>
  )
}

export default Header