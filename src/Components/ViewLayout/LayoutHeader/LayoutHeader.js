import React from 'react'
import {Link} from 'react-router-dom'

import './LayoutHeader.scss'
import '../../../css-grid/grid.scss'

const LayoutHeader = () =>{
  return(
    <header className={'grid_12 LayoutHeader'}>
      <Link to={'/'} className={'LayoutHeader__home'}>Home</Link>
    </header>
  )
}

export default LayoutHeader