import { combineReducers } from 'redux'

import {
  FETCH_LAYOUT_BEGIN,
  FETCH_LAYOUT_SUCCESS,
  FETCH_LAYOUT_FAILURE,
  ADD_ARTICLE_TO_LAYOUT,
  UPDATE_LAYOUT,
  REMOVE_ARTICLE_FROM_LAYOUT
} from '../../actions'
import parameter from './parameter'
import rows from './rows'

const byIdsInLayout = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LAYOUT_BEGIN:
      return state
    case FETCH_LAYOUT_SUCCESS:
      return parameter(state.layout, action).reverse().reduce((obj, param) => {
        obj[param.id] = param
        return obj
      }, {})
    case FETCH_LAYOUT_FAILURE:
      return state
    case ADD_ARTICLE_TO_LAYOUT:
      return {
        ...state,
        [action.id]: parameter(state[action.id], action)
      }
    case REMOVE_ARTICLE_FROM_LAYOUT:
      const newLayout = Object.assign({}, state)
      delete newLayout[action.id]
      parameter(state[action.id], action)
      return newLayout
    case UPDATE_LAYOUT:
      return Object.assign({}, state, {
        [action.id]: parameter(state[action.id], action)
      })
    default:
      return state
  }
}

const allIdsInLayout = (state = [], action) => {
  switch (action.type) {
    case FETCH_LAYOUT_BEGIN:
      return state
    case FETCH_LAYOUT_SUCCESS:
      return [...parameter(state.layout, action).map(param => param.id)]
    case FETCH_LAYOUT_FAILURE:
      return state
    case ADD_ARTICLE_TO_LAYOUT:
      return [...state, action.id]
    case REMOVE_ARTICLE_FROM_LAYOUT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

const layout = combineReducers({
  byIdsInLayout,
  allIdsInLayout,
  rows
})

export default layout

// Selectors
export const getIdsInLayout = state => state.allIdsInLayout
export const getLayoutParameters = state => state.allIdsInLayout.map(id => state.byIdsInLayout[id])
export const getAllRows = state => state.rows.rowsInLayout.map(id => state.rows.rowsByIds[id])
export const getRowById = (id, state) => state.rows.rowsByIds[id]
