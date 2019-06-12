import React from 'react'

import BEM from '../../helpers/BEM'
import './Toolbar.scss'
import { NavLink } from 'react-router-dom'

const b = BEM('Toolbar')

const Toolbar = () => (
  <nav className={b()}>
    <button className={b('button', ['save'])}>
      Save
    </button>
    <NavLink className={b('button', ['preview'])} to={'/layout'}>
      Preview
    </NavLink>
  </nav>
)

export default Toolbar