import React from 'react'
// import { ActionCreators as UndoActionCreators } from 'redux-undo'
// import { connect } from 'react-redux'

import BEM from '../../helpers/BEM'
import './Toolbar.scss'
import { NavLink } from 'react-router-dom'
// import { canRedoLayout, canUndoLayout } from '../../reducers'

const b = BEM('Toolbar')

const Toolbar = ({ canUndo, canRedo, onUndo, onRedo }) => (
  <nav className={b()}>
    <button className={b('button', ['undo'])}>
      Undo
    </button>
    <button className={b('button', ['redo'])}>
      Redo
    </button>
    <button className={b('button', ['save'])}>
      Save
    </button>
    <NavLink className={b('button', ['preview'])} to={'/layout'}>
      Preview
    </NavLink>
  </nav>
)

// export default connect(
//   state => ({
//     canUndo: canUndoLayout(state).length > 0,
//     canRedo: canRedoLayout(state).length > 0
//   }),
//   {
//     onUndo: UndoActionCreators.undo,
//     onRedo: UndoActionCreators.redo
//   }
// )(Toolbar)

export default Toolbar