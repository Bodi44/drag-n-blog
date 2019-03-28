import Database from '../../Database/Database'
import {
  FETCH_LAYOUT_ARTICLES_BEGIN,
  FETCH_LAYOUT_ARTICLES_SUCCESS,
  FETCH_LAYOUT_ARTICLES_FAILURE,
  ADD_LAYOUT_ARTICLE,
  UPDATE_LAYOUT_ARTICLE,
  REMOVE_LAYOUT_ARTICLE
} from '../../actions'
import { combineReducers } from 'redux'

const database = new Database('http://localhost:3001/layoutContainers')

const idsInLayout = (state = [], action) => {
  switch (action.type) {
    case FETCH_LAYOUT_ARTICLES_BEGIN:
      return state
    case FETCH_LAYOUT_ARTICLES_SUCCESS:
      return [...action.payload.layoutArticles.map(article => article.id)]
    case FETCH_LAYOUT_ARTICLES_FAILURE:
      return state
    case ADD_LAYOUT_ARTICLE:
      database.createInLayout(action)
      return [...state, action.id]
    case REMOVE_LAYOUT_ARTICLE:
      database.delete(action.id)
      return state.filter(id => id !== action.id)
    case UPDATE_LAYOUT_ARTICLE:
      const newState = state
      newState.forEach(id => {
        if (id === action.id) {
          newState[newState.indexOf(id)] = action.id
        }
      })
      return newState
    default:
      return state
  }
}

const layoutArticlesSizes = (state = {}, action) => {
  switch (action.type) {
    case FETCH_LAYOUT_ARTICLES_BEGIN:
      return state
    case FETCH_LAYOUT_ARTICLES_SUCCESS:
      return action.payload.layoutArticles.reverse().reduce((obj, layoutArticle) => {
        obj[layoutArticle.id] = layoutArticle.size
        return obj
      }, {})
    case FETCH_LAYOUT_ARTICLES_FAILURE:
      return state
    case ADD_LAYOUT_ARTICLE:
      console.log(action)
      return {
        ...state,
        [action.id]: action.size
      }
    case REMOVE_LAYOUT_ARTICLE:
      const newSizes = Object.assign({}, state)
      delete newSizes[action.id]
      return newSizes
    case UPDATE_LAYOUT_ARTICLE:
      return Object.assign({}, state, {
        [action.id]: {
          minWidth: action.size.minWidth,
          maxWidth: action.size.maxWidth
        }
      })
    default:
      return state
  }
}

const layoutArticles = combineReducers({
  idsInLayout,
  layoutArticlesSizes
})

export default layoutArticles

// Selectors
export const getArticlesInLayout = state => state.idsInLayout
export const getLayoutArticlesSizes = state => state.layoutArticlesSizes
