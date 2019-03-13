// @flow
import { generateUniqueId } from '../helpers/generateUniqueId'
import Database from '../Database/Database'
import { getAllArticles, getLayout } from '../api'

export const FETCH_ARTICLES_BEGIN = 'FETCH_ARTICLES_BEGIN'
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE'
export const FETCH_LAYOUT_ARTICLES_BEGIN = 'FETCH_LAYOUT_ARTICLES_BEGIN'
export const FETCH_LAYOUT_ARTICLES_SUCCESS = 'FETCH_LAYOUT_ARTICLES_SUCCESS'
export const FETCH_LAYOUT_ARTICLES_FAILURE = 'FETCH_LAYOUT_ARTICLES_FAILURE'
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const ADD_LAYOUT_ARTICLE = 'ADD_LAYOUT_ARTICLE'
export const REMOVE_LAYOUT_ARTICLE = 'REMOVE_LAYOUT_ARTICLE'
export const UPDATE_LAYOUT_ARTICLE = 'UPDATE_LAYOUT_ARTICLE'

type Dispatcher = (Object | Promise<Object>) => void
type Error = string | null
type Article = {
  id: string,
  title: string,
  content: string,
  date: string,
  author: string,
  tags?: [Object]
}

export type ArticlesActions = {
  type: string,
  id?: string,
  title?: string,
  content?: string,
  date?: string,
  author?: string,
  tags?: [Object],
  payload?: Object
}

export const addArticle = (data: Object): { type: string, ...Article } => ({
  type: ADD_ARTICLE,
  id: generateUniqueId(),
  title: data.title,
  content: data.content,
  date: Database.dateToString(new Date()),
  author: data.author,
  tags: data.tags
})

export const removeArticle = (id: string): ArticlesActions => ({
  type: REMOVE_ARTICLE,
  id
})

export const updateArticle = (
  id: string,
  { title, content, author, tags }: Object
): ArticlesActions => ({
  type: UPDATE_ARTICLE,
  id,
  title,
  content,
  author,
  tags
})

export const fetchArticlesBegin = (): ArticlesActions => ({
  type: FETCH_ARTICLES_BEGIN
})

export const fetchArticlesSuccess = (articles: [Article]): ArticlesActions => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles }
})

export const fetchArticlesFailure = (error: Error): ArticlesActions => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: { error }
})

export const addLayoutArticle = (data: Object): ArticlesActions => ({
  type: ADD_LAYOUT_ARTICLE,
  id: generateUniqueId(),
  title: data.title,
  content: data.content,
  date: Database.dateToString(new Date()),
  author: data.author,
  tags: data.tags
})

export const removeLayoutArticle = (id: string): ArticlesActions => ({
  type: REMOVE_LAYOUT_ARTICLE,
  id
})

export const updateLayoutArticle = (
  id: string,
  { title, content, author, tags }: Object
): ArticlesActions => ({
  type: UPDATE_LAYOUT_ARTICLE,
  id,
  title,
  content,
  author,
  tags
})

export const fetchLayoutArticlesBegin = (): ArticlesActions => ({
  type: FETCH_LAYOUT_ARTICLES_BEGIN
})

export const fetchLayoutArticlesSuccess = (
  layoutArticles: [Article]
): ArticlesActions => ({
  type: FETCH_LAYOUT_ARTICLES_SUCCESS,
  payload: { layoutArticles }
})

export const fetchLayoutArticlesFailure = (error: Error): ArticlesActions => ({
  type: FETCH_LAYOUT_ARTICLES_FAILURE,
  payload: { error }
})

export const fetchArticles = () => async (dispatch: Dispatcher) => {
  dispatch(fetchArticlesBegin())

  try {
    const data = await getAllArticles()
    dispatch(fetchArticlesSuccess(data))
  } catch (error) {
    dispatch(fetchArticlesFailure(error))
  }
}

export const fetchLayoutArticles = () => async (dispatch: Dispatcher) => {
  dispatch(fetchLayoutArticlesBegin())

  try {
    const data = await getLayout()
    dispatch(fetchLayoutArticlesSuccess(data))
  } catch (error) {
    dispatch(fetchLayoutArticlesFailure(error))
  }
}
