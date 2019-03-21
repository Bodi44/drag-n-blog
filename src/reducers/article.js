import update from 'immutability-helper'
import Database from '../Database/Database'

import type { ArticlesActions } from '../actions'
import {
  ADD_ARTICLE,
  FETCH_ARTICLES_BEGIN,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS,
  MOVE_ARTICLE,
  REMOVE_ARTICLE,
  UPDATE_ARTICLE
} from '../actions'

const database = new Database('http://localhost:3001/articles')

export type ArticleState = {
  articles: Array<Object>,
  loading: boolean,
  error: null | string
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null
}

const article = (
  state: ArticleState = initialState,
  action: ArticlesActions
) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        articles: action.payload.articles
      }
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        articles: []
      }
    case ADD_ARTICLE:
      database.create(action)
      return {
        ...state,
        articles: [
          ...state.articles,
          {
            id: action.id,
            title: action.title,
            content: action.content,
            date: action.date,
            author: action.author,
            tags: action.tags
          }
        ]
      }
    case REMOVE_ARTICLE:
      database.delete(action.id)
      return {
        ...state,
        articles: [
          ...state.articles.filter(article => article.id !== action.id)
        ]
      }
    case UPDATE_ARTICLE:
      database.update(action.id, {
        title: action.title,
        content: action.content,
        author: action.author,
        tags: action.tags
      })
      const newState = Object.assign({}, state)
      newState.articles.forEach(article => {
        if (article.id === action.id) {
          article.title = action.title
          article.content = action.content
          article.data = Database.dateToString(new Date())
          article.author = action.author
          article.tags = action.tags
        }
      })
      return newState
    case MOVE_ARTICLE:
      return update(
        state, {
          articles: {
            $splice: [[action.index, 1], [action.overIndex, 0, action.dragArticle]]
          }
        }
      )
    default:
      return state
  }
}

export default article

// Selectors
export const getAllArticles = state => state.articles
export const isAllArticlesLoading = state => state.loading
export const isAllArticlesLoadingError = state => state.error
export const getArticlesById = (searchableId, state) =>
  state.articles.find(({ id }) => id === searchableId)
