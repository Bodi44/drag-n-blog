import { combineReducers } from 'redux'

import articles, * as fromArticles from './articles'
import layout, * as fromLayoutArticles from './layout'

export default combineReducers({
  articles: articles,
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

export const getAllLayoutArticles = state =>
  fromLayoutArticles.getAllLayoutArticles(state.layoutArticles)

export const isAllLayoutArticlesLoading = state =>
  fromLayoutArticles.isAllLayoutArticlesLoading(state.layoutArticles)

export const isAllLayoutArticlesLoadingError = state =>
  fromLayoutArticles.isAllLayoutArticlesLoadingError(state.layoutArticles)

export const getLayoutArticlesById = (id, state) =>
  fromLayoutArticles.getLayoutArticleById(id, state.layoutArticles)
