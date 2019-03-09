// @flow
import { generateUniqueId } from '../helpers/generateUniqueId'
import Database from '../Database/Database'

export const FETCH_ARTICLES_BEGIN: string = 'FETCH_ARTICLES_BEGIN'
export const FETCH_ARTICLES_SUCCESS: string = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_FAILURE: string = 'FETCH_ARTICLES_FAILURE'
export const FETCH_LAYOUT_ARTICLES_BEGIN: string = 'FETCH_LAYOUT_ARTICLES_BEGIN'
export const FETCH_LAYOUT_ARTICLES_SUCCESS: string = 'FETCH_LAYOUT_ARTICLES_SUCCESS'
export const FETCH_LAYOUT_ARTICLES_FAILURE: string = 'FETCH_LAYOUT_ARTICLES_FAILURE'
export const ADD_ARTICLE: string = 'ADD_ARTICLE'
export const REMOVE_ARTICLE: string = 'REMOVE_ARTICLE'
export const UPDATE_ARTICLE: string = 'UPDATE_ARTICLE'
export const ADD_LAYOUT_ARTICLE: string = 'ADD_LAYOUT_ARTICLE'
export const REMOVE_LAYOUT_ARTICLE: string = 'REMOVE_LAYOUT_ARTICLE'
export const UPDATE_LAYOUT_ARTICLE: string = 'UPDATE_LAYOUT_ARTICLE'

export type ArticlesActions = {
  type: string,
  id?: string,
  title?: string,
  content?: string,
  date?: string,
  author?: string,
  tags?: Array<Object>,
  payload?: Object,
}

export const addArticle = (data: Object): ArticlesActions => ({
  type: ADD_ARTICLE,
  id: generateUniqueId(),
  title: data.title,
  content: data.content,
  date: Database.dateToString(new Date()),
  author: data.author,
  tags: data.tags,
})

export const removeArticle = (id: string): ArticlesActions => ({
  type: REMOVE_ARTICLE,
  id,
})

export const updateArticle = (id: string, { title, content, author, tags }: Object): ArticlesActions => ({
  type: UPDATE_ARTICLE,
  id,
  title,
  content,
  author,
  tags,
})

export const fetchArticlesBegin = (): ArticlesActions => ({
  type: FETCH_ARTICLES_BEGIN,
})

export const fetchArticlesSuccess = (articles: Array<any>): ArticlesActions => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles },
})

export const fetchArticlesFailure = (error: string | null): ArticlesActions => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: { error },
})

export const addLayoutArticle = (data: Object): ArticlesActions => {
  return {
    type: ADD_LAYOUT_ARTICLE,
    id: generateUniqueId(),
    title: data.title,
    content: data.content,
    date: Database.dateToString(new Date()),
    author: data.author,
    tags: data.tags,
  }
}

export const removeLayoutArticle = (id: string): ArticlesActions => ({
  type: REMOVE_LAYOUT_ARTICLE,
  id,
})

export const updateLayoutArticle = (id: string, { title, content, author, tags }: Object): ArticlesActions => ({
  type: UPDATE_LAYOUT_ARTICLE,
  id,
  title,
  content,
  author,
  tags,
})

export const fetchLayoutArticlesBegin = (): ArticlesActions => ({
  type: FETCH_LAYOUT_ARTICLES_BEGIN,
})

export const fetchLayoutArticlesSuccess = (layoutArticles: Array<any>): ArticlesActions => ({
  type: FETCH_LAYOUT_ARTICLES_SUCCESS,
  payload: { layoutArticles },
})

export const fetchLayoutArticlesFailure = (error: string | null): ArticlesActions => ({
  type: FETCH_LAYOUT_ARTICLES_FAILURE,
  payload: { error },
})

const handleErrors = (response) => {
  if (!response.ok)
    throw Error(response.statusText)
  else
    return response
}

export const fetchArticles = () => (dispatch: (Object | Promise<Object>) => void) => {
  dispatch(fetchArticlesBegin())
  return fetch('http://localhost:3001/articles')
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(fetchArticlesSuccess(json))
      return json
    })
    .catch(error => dispatch(fetchArticlesFailure(error)))
}

export const fetchLayoutArticles = () => (dispatch: (Object | Promise<Object>) => void) => {
  dispatch(fetchLayoutArticlesBegin())
  return fetch('http://localhost:3001/layoutContainers')
    .then(handleErrors)
    .then(res => res.json())
    .then(json => {
      dispatch(fetchLayoutArticlesSuccess(json))
      return json
    })
    .catch(error => dispatch(fetchLayoutArticlesFailure(error)))
}
