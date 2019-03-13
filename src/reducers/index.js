import { combineReducers } from 'redux'

import article, * as fromArticles from './article'
import layout from './layout'

export default combineReducers({
  articles: article,
  layoutArticles: layout
})

//Article selectors
export const getAllArticles = state =>
  fromArticles.getAllArticles(state.articles)

export const isAllArticlesLoading = state =>
  fromArticles.isAllArticlesLoading(state.articles)

export const isAllArticlesLoadingError = state =>
  fromArticles.isAllArticlesLoadingError(state.articles)

export const getArticlesById = (id, state) =>
  fromArticles.getArticlesById(id, state.articles)
