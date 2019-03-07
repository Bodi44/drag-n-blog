import { generateUniqueId } from '../helpers/generateUniqueId'
import Database from '../Database/Database'

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

export const addArticle = (data) => {
  return {
    type: ADD_ARTICLE,
    id: generateUniqueId(),
    title: data.title,
    content: data.content,
    date: Database.dateToString(new Date()),
    author: data.author,
    tags: data.tags,
  }
}

export const removeArticle = id => ({
  type: REMOVE_ARTICLE,
  id,
})

export const updateArticle = (id, { title, content, author, tags }) => {
  return {
    type: UPDATE_ARTICLE,
    id,
    title,
    content,
    author,
    tags,
  }
}

export const fetchArticlesBegin = () => ({
  type: FETCH_ARTICLES_BEGIN,
})

export const fetchArticlesSuccess = articles => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles },
})

export const fetchArticlesFailure = error => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: { error },
})

export const addLayoutArticle = (data) => {
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

export const removeLayoutArticle = id => ({
  type: REMOVE_LAYOUT_ARTICLE,
  id,
})

export const updateLayoutArticle = (id, { title, content, author, tags }) => ({
  type: UPDATE_LAYOUT_ARTICLE,
  id,
  title,
  content,
  author,
  tags,
})

export const fetchLayoutArticlesBegin = () => ({
  type: FETCH_LAYOUT_ARTICLES_BEGIN,
})

export const fetchLayoutArticlesSuccess = layoutArticles => ({
  type: FETCH_LAYOUT_ARTICLES_SUCCESS,
  payload: { layoutArticles },
})

export const fetchLayoutArticlesFailure = error => ({
  type: FETCH_LAYOUT_ARTICLES_FAILURE,
  payload: { error },
})

const handleErrors = response => {
  if (!response.ok)
    throw Error(response.statusText)
  else
    return response
}

export const fetchArticles = () => dispatch => {
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

export const fetchLayoutArticles = () => dispatch => {
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
