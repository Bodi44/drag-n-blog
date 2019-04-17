import { combineReducers } from 'redux'

import articles, * as fromArticles from './articles'
import layout, * as fromLayout from './layout'

export default combineReducers({
  articles: articles,
  layout: layout
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

export const getAllArticlesInLayout = state =>
  fromArticles.getAllArticles(state.articles).filter(article => fromLayout.getIdsInLayout(state.layout).indexOf(article.id) !== -1)

//Layout selectors
export const getIdsInLayout = state =>
  fromLayout.getIdsInLayout(state.layout)

export const getLayoutParameters = state =>
  fromLayout.getLayoutParameters(state.layout)

export const getAllRows = state =>
  fromLayout.getAllRows(state.layout)

export const getRowById = (id, state) =>
  fromLayout.getRowById(id, state.layout)