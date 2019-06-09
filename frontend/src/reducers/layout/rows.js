import { combineReducers } from 'redux'
import update from 'immutability-helper'

import {
  ADD_ARTICLE_TO_LAYOUT,
  ADD_NEW_ROW_TO_LAYOUT,
  DELETE_ROW_FROM_LAYOUT,
  FETCH_ROWS_BEGIN,
  FETCH_ROWS_FAILURE,
  FETCH_ROWS_SUCCESS,
  REMOVE_ARTICLE_FROM_LAYOUT,
  REMOVE_ARTICLE_FROM_ROW,
  REORDER_ARTICLE_IN_ROW,
  UPDATE_LAYOUT
} from '../../actions'

import Database from '../../Database'

const database = new Database('http://localhost:4001/rowsInLayout')

const rowsByIds = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ROWS_BEGIN:
      return state
    case FETCH_ROWS_SUCCESS:
      return action.payload.rowsInLayout.reverse().reduce((obj, row) => {
        obj[row.id] = row
        return obj
      }, {})
    case FETCH_ROWS_FAILURE:
      return state
    case ADD_ARTICLE_TO_LAYOUT:
      database.updateRow(action.row, [...state[action.row].articlesInRow, action.id])

      return {
        ...state,
        [action.row]: {
          id: action.row,
          articlesInRow: [...state[action.row].articlesInRow, action.id]
        }
      }
    case ADD_NEW_ROW_TO_LAYOUT:
      database.createRow({ id: action.id, articlesInRow: [] })

      return {
        ...state,
        [action.id]: {
          id: action.id,
          articlesInRow: []
        }
      }
    case DELETE_ROW_FROM_LAYOUT:
      database.delete(action.id)
      const newState = Object.assign({}, state)
      delete newState[action.id]
      return newState
    case REMOVE_ARTICLE_FROM_LAYOUT:
      database.updateRow(
        action.rowId,
        state[action.rowId].articlesInRow.filter(articleId => articleId !== action.id)
      )

      return {
        ...state,
        [action.rowId]: {
          ...state[action.rowId],
          articlesInRow: state[action.rowId].articlesInRow.filter(articleId => articleId !== action.id)
        }
      }
    case REORDER_ARTICLE_IN_ROW:
      database.updateRow(
        action.id,
        update(
          state[action.id].articlesInRow, {
            $splice: [[action.index, 1], [action.overIndex, 0, action.draggedId]]
          }
        )
      )

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          articlesInRow: update(
            state[action.id].articlesInRow, {
              $splice: [[action.index, 1], [action.overIndex, 0, action.draggedId]]
            }
          )
        }
      }
    case REMOVE_ARTICLE_FROM_ROW:
      database.updateRow(
        action.id,
        state[action.id].articlesInRow.filter(id => id !== action.articleId)
      )

      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          articlesInRow: state[action.id].articlesInRow.filter(id => id !== action.articleId)
        }
      }

    case UPDATE_LAYOUT:
      database.updateRow(
        action.row,
        state[action.row].articlesInRow.indexOf(action.id) === -1 ?
          [...state[action.row].articlesInRow, action.id] : state[action.row].articlesInRow
      )

      return {
        ...state,
        [action.row]: {
          ...state[action.row],
          articlesInRow: state[action.row].articlesInRow.indexOf(action.id) === -1 ?
            [...state[action.row].articlesInRow, action.id] : state[action.row].articlesInRow
        }
      }
    default:
      return state
  }
}

const rowsInLayout = (state = [], action) => {
  switch (action.type) {
    case FETCH_ROWS_BEGIN:
      return state
    case FETCH_ROWS_SUCCESS:
      return [...action.payload.rowsInLayout.map(row => row.id)]
    case FETCH_ROWS_FAILURE:
      return state
    case ADD_NEW_ROW_TO_LAYOUT:
      return [...state, action.id]
    case DELETE_ROW_FROM_LAYOUT:
      return state.filter(id => id !== action.id)
    default:
      return state
  }
}

const rows = combineReducers({
  rowsByIds,
  rowsInLayout
})

export default rows