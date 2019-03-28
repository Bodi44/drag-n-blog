import { combineReducers } from 'redux'

import articles, * as fromArticles from './articles'
import layoutArticles, * as fromLayoutArticles from './layoutArticles'

export default combineReducers({
  articles: articles,
  layoutArticles: layoutArticles
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

export const getArticlesInLayout = state =>
  fromLayoutArticles.getArticlesInLayout(state.layoutArticles)

export const getLayoutArticlesSizes = state =>
  fromLayoutArticles.getLayoutArticlesSizes(state.layoutArticles)