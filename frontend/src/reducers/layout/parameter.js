import {
  ADD_ARTICLE_TO_LAYOUT,
  UPDATE_LAYOUT,
  FETCH_LAYOUT_SUCCESS,
  REMOVE_ARTICLE_FROM_LAYOUT
} from '../../actions'

import Database from '../../Database'

const database = new Database('http://localhost:4000/layoutParameters')

const parameter = (state, action) => {
  switch (action.type) {
    case FETCH_LAYOUT_SUCCESS:
      return action.payload.layoutParameters
    case ADD_ARTICLE_TO_LAYOUT:
      database.createInLayout(action)
      return {
        id: action.id,
        row: action.row,
        col: action.col
      }
    case REMOVE_ARTICLE_FROM_LAYOUT:
      database.delete(action.id)
      return
    case UPDATE_LAYOUT:
      database.updateInLayout(action.id, { row: action.row, col: action.col })
      return {
        id: action.id,
        row: action.row,
        col: action.col
      }
    default:
      return state
  }
}

export default parameter