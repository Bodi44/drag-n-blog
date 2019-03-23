import type { ArticlesActions } from '../actions'
import {
  ADD_ARTICLE,
  FETCH_ARTICLES_BEGIN,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLES_SUCCESS, MOVE_ARTICLE,
  REMOVE_ARTICLE, UPDATE_ARTICLE
} from '../actions'

import article from './article'
import loading from './loading'
import error from './error'

export type ArticleState = {
  articles: Array<Object>,
  loading: boolean,
  error: null | string
}

const initialState: ArticleState = {
  articles: [],
  loading: false
}


const articles = (
  state: ArticleState = initialState,
  action: ArticlesActions
) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return {
        ...state,
        loading: loading(state.loading, action),
        error: error(state.error, action)
      }
    case FETCH_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: loading(state.loading, action),
        articles: article(state.articles, action)
      }
    case FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        loading: loading(state.loading, action),
        error: error(state.error, action),
        articles: article(state.articles, action)
      }
    case ADD_ARTICLE:
      return {
        ...state,
        articles: article(state.articles, action)
      }
    case REMOVE_ARTICLE:
      return {
        ...state,
        articles: article(state.articles, action)
      }
    case UPDATE_ARTICLE:
      return {
        ...state,
        articles: article(state.articles, action)
      }
    case MOVE_ARTICLE:
      return {
        ...state,
        articles: article(state.articles, action)
      }
    default:
      return state
  }
}

export default articles

// Selectors
export const getAllArticles = state => state.articles
export const isAllArticlesLoading = state => state.loading
export const isAllArticlesLoadingError = state => state.error
export const getArticlesById = (searchableId, state) =>
  state.articles.find(({ id }) => id === searchableId)