import update from 'immutability-helper'

import {
  ADD_ARTICLE,
  FETCH_ARTICLES_BEGIN,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS, MOVE_ARTICLE,
  REMOVE_ARTICLE, UPDATE_ARTICLE
} from '../../actions'

import article from './article'

import { combineReducers } from 'redux'

const byId = (state = {}, action = {}) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return state
    case FETCH_ARTICLES_SUCCESS:
      return article(state.articles, action).reverse().reduce((obj, article) => {
        obj[article.id] = article
        return obj
      }, {})
    case FETCH_ARTICLES_FAILURE:
      return state
    case ADD_ARTICLE:
      return {
        ...state,
        [action.id]: article(state[action.id], action)
      }
    case REMOVE_ARTICLE:
      const newState = Object.assign({}, state)
      delete newState[action.id]
      article(state[action.id], action)
      return newState
    case UPDATE_ARTICLE:
      return Object.assign({}, state, {
        [action.id]: article(state[action.id], action)
      })
    case MOVE_ARTICLE:
      const newOrder = {}
      update(
        Object.keys(state),
        { $splice: [[action.index, 1], [action.overIndex, 0, action.dragArticle.id]] }
      ).forEach(key => newOrder[key] = state[key])
      return newOrder
    default:
      return state
  }
}

const allIds = (state = [], action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return state
    case FETCH_ARTICLES_SUCCESS:
      return [...article(state.articles, action).map(article => article.id)]
    case FETCH_ARTICLES_FAILURE:
      return state
    case ADD_ARTICLE:
      return [...state, action.id]
    case REMOVE_ARTICLE:
      return state.filter(id => id !== action.id)
    case UPDATE_ARTICLE:
      const newState = state
      newState.forEach(id => {
        if (id === action.id) {
          newState[newState.indexOf(id)] = action.id
        }
      })

      console.log(newState)
      return state
    case MOVE_ARTICLE:
      return update(
        state, {
          $splice: [[action.index, 1], [action.overIndex, 0, action.dragArticle.id]]
        }
      )
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return true
    case FETCH_ARTICLES_SUCCESS:
      return false
    case FETCH_ARTICLES_FAILURE:
      return false
    default:
      return state
  }
}

const allErrors = (state = null, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return null
    case FETCH_ARTICLES_SUCCESS:
      return null
    case FETCH_ARTICLES_FAILURE:
      return null
    default:
      return state
  }
}


const articles = combineReducers({
  byId,
  allIds,
  isFetching,
  allErrors
})

export default articles

// Selectors
export const getAllArticles = state => state.allIds.map(id => state.byId[id])
export const isAllArticlesLoading = state => state.isFetching
export const isAllArticlesLoadingError = state => state.allErrors
export const getArticlesById = (searchableId, state) => state.byId[searchableId]
