import { combineReducers } from 'redux'

import articleReducer from './articleReducer'
import layoutReducer from './layoutReducer'

export default combineReducers({
  articleReducer,
  layoutReducer,
})