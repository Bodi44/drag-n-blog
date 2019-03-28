// @flow
import { generateUniqueId } from '../helpers/generateUniqueId'
import dateToString from '../helpers/dateToString'
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
export const MOVE_ARTICLE = 'MOVE_ARTICLE'
export const ADD_LAYOUT_ARTICLE = 'ADD_LAYOUT_ARTICLE'
export const REMOVE_LAYOUT_ARTICLE = 'REMOVE_LAYOUT_ARTICLE'
export const UPDATE_LAYOUT_ARTICLE = 'UPDATE_LAYOUT_ARTICLE'

type Dispatcher = (Object | Promise<Object>) => void
type Error = string | null
type Article = {
  id: string,
  title: string,
  content: string,
  date?: string,
  author: string,
  tags?: [Object],
  inLayout: boolean
}

export type ArticlesActions = {
  type: string,
  id?: string,
  title?: string,
  content?: string,
  date?: string,
  author?: string,
  tags?: [Object],
  inLayout: boolean,
  payload?: Object,
  index: Number,
  overIndex: Number,
  dragArticle: Article,
  overArticle: Article
}

export const addArticle = (data: Object): { type: string, ...Article } => ({
  type: ADD_ARTICLE,
  id: generateUniqueId(),
  title: data.title,
  content: data.content,
  date: dateToString(new Date()),
  author: data.author,
  tags: data.tags,
  inLayout: data.inLayout
})

export const removeArticle = (id: string): { type: string, id: string } => ({
  type: REMOVE_ARTICLE,
  id
})

export const updateArticle = (
  id: string,
  { title, content, author, tags, inLayout }: Object
): { type: string, ...Article } => ({
  type: UPDATE_ARTICLE,
  id,
  title,
  content,
  author,
  tags,
  inLayout
})

export const moveArticle = (index, overIndex, dragArticle, overArticle) => ({
  type: MOVE_ARTICLE,
  index: index,
  overIndex: overIndex,
  dragArticle: dragArticle,
  overArticle: overArticle
})

export const fetchArticlesBegin = (): { type: string } => ({
  type: FETCH_ARTICLES_BEGIN
})

export const fetchArticlesSuccess = (articles: [Article]): { type: string, payload: { articles: [Article] } } => ({
  type: FETCH_ARTICLES_SUCCESS,
  payload: { articles }
})

export const fetchArticlesFailure = (error: Error): { type: string, payload: { error: Error } } => ({
  type: FETCH_ARTICLES_FAILURE,
  payload: { error }
})

export const addLayoutArticle = ({ id, col, row, size }) => ({
  type: ADD_LAYOUT_ARTICLE,
  id,
  col,
  row,
  size
})

export const removeLayoutArticle = (id: string): { type: string, id: string } => ({
  type: REMOVE_LAYOUT_ARTICLE,
  id
})

export const updateLayoutArticle = (
  id: string,
  { col, row, size }: Object
): { type: string, ...Article } => ({
  type: UPDATE_LAYOUT_ARTICLE,
  id,
  col,
  row,
  size
})

export const fetchLayoutArticlesBegin = (): { type: string } => ({
  type: FETCH_LAYOUT_ARTICLES_BEGIN
})

export const fetchLayoutArticlesSuccess = (
  layoutArticles: [Article]
): { type: string, payload: { layoutArticles: [Article] } } => ({
  type: FETCH_LAYOUT_ARTICLES_SUCCESS,
  payload: { layoutArticles }
})

export const fetchLayoutArticlesFailure = (error: Error): { type: string, payload: { error: Error } } => ({
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
