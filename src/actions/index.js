// @flow
import { generateUniqueId } from '../helpers/generateUniqueId'
import dateToString from '../helpers/dateToString'
import { getAllArticles, getLayout, getRows } from '../api'
//Article action-names
export const FETCH_ARTICLES_BEGIN = 'FETCH_ARTICLES_BEGIN'
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS'
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_FAILURE'
export const ADD_ARTICLE = 'ADD_ARTICLE'
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE'
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
//Layout action-names
export const FETCH_LAYOUT_BEGIN = 'FETCH_LAYOUT_BEGIN'
export const FETCH_LAYOUT_SUCCESS = 'FETCH_LAYOUT_SUCCESS'
export const FETCH_LAYOUT_FAILURE = 'FETCH_LAYOUT_FAILURE'
export const ADD_ARTICLE_TO_LAYOUT = 'ADD_ARTICLE_TO_LAYOUT'
export const REMOVE_ARTICLE_FROM_LAYOUT = 'REMOVE_ARTICLE_FROM_LAYOUT'
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT'
//Rows action-names
export const FETCH_ROWS_BEGIN = 'FETCH_ROWS_BEGIN'
export const FETCH_ROWS_SUCCESS = 'FETCH_ROWS_SUCCESS'
export const FETCH_ROWS_FAILURE = 'FETCH_ROWS_FAILURE'
export const ADD_NEW_ROW_TO_LAYOUT = 'ADD_NEW_ROW_TO_LAYOUT'
export const DELETE_ROW_FROM_LAYOUT = 'DELETE_ROW_FROM_LAYOUT'
export const REORDER_ARTICLE_IN_ROW = 'REORDER_ARTICLE_IN_ROW'
export const REMOVE_ARTICLE_FROM_ROW = 'REMOVE_ARTICLE_FROM_ROW'

type Dispatcher = (Object | Promise<Object>) => void
type Error = string | null
type Article = {
  id: string,
  title: string,
  content: string,
  date?: string,
  author: string,
  tags?: [Object],
}

//Articles actions
export const addArticle = (data: Object): { type: string, ...Article } => ({
  type: ADD_ARTICLE,
  id: generateUniqueId(),
  title: data.title,
  content: data.content,
  date: dateToString(new Date()),
  author: data.author,
  tags: data.tags
})

export const removeArticle = (id: string): { type: string, id: string } => ({
  type: REMOVE_ARTICLE,
  id
})

export const updateArticle = (
  id: string,
  { title, content, author, tags }: Object
): { type: string, ...Article } => ({
  type: UPDATE_ARTICLE,
  id,
  title,
  content,
  author,
  tags
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

export const fetchArticles = () => async (dispatch: Dispatcher) => {
  dispatch(fetchArticlesBegin())

  try {
    const data = await getAllArticles()
    dispatch(fetchArticlesSuccess(data))
  } catch (error) {
    dispatch(fetchArticlesFailure(error))
  }
}

//Layout actions
type Layout = {
  id: string,
  col: string,
  row: string
}

export const addArticleToLayout = ({ id, col, row }: Object): { type: string, ...Layout } => ({
  type: ADD_ARTICLE_TO_LAYOUT,
  id,
  col,
  row
})

export const removeArticleFromLayout = (id: string, rowId: string): { type: string, id: string, rowId: string } => ({
  type: REMOVE_ARTICLE_FROM_LAYOUT,
  id,
  rowId
})

export const updateLayout = (id: string, col: string, row: string): { type: string, ...Layout } => ({
  type: UPDATE_LAYOUT,
  id,
  col,
  row
})

export const fetchLayoutBegin = (): { type: string } => ({
  type: FETCH_LAYOUT_BEGIN
})

export const fetchLayoutSuccess = (
  layoutParameters: [Article]
): { type: string, payload: { layoutParameters: [Article] } } => ({
  type: FETCH_LAYOUT_SUCCESS,
  payload: { layoutParameters }
})

export const fetchLayoutFailure = (error: Error): { type: string, payload: { error: Error } } => ({
  type: FETCH_LAYOUT_FAILURE,
  payload: { error }
})

export const fetchLayout = () => async (dispatch: Dispatcher) => {
  dispatch(fetchLayoutBegin())

  try {
    const data = await getLayout()
    dispatch(fetchLayoutSuccess(data))
  } catch (error) {
    dispatch(fetchLayoutFailure(error))
  }
}

//Rows actions
export const fetchRowsBegin = (): { type: string } => ({
  type: FETCH_ROWS_BEGIN
})

export const fetchRowsSuccess = (rowsInLayout: [Article]): { type: string, payload: { rowsInLayout: [Article] } } => ({
  type: FETCH_ROWS_SUCCESS,
  payload: { rowsInLayout }
})

export const fetchRowsFailure = (error: Error): { type: string, payload: { error: Error } } => ({
  type: FETCH_ROWS_FAILURE,
  payload: { error }
})

export const fetchRows = () => async (dispatch: Dispatcher) => {
  dispatch(fetchRowsBegin())

  try {
    const data = await getRows()
    dispatch(fetchRowsSuccess(data))
  } catch (error) {
    dispatch(fetchRowsFailure(error))
  }
}

export const addNewRowToLayout = (): { type: string, id: string } => ({
  type: ADD_NEW_ROW_TO_LAYOUT,
  id: generateUniqueId()
})

export const deleteRowFromLayout = (id: string): { type: string, id: string } => ({
  type: DELETE_ROW_FROM_LAYOUT,
  id
})

export const reorderArticleInRow = (rowId: string, index: number, overIndex: number, draggedId: string, overId: string):
  { type: string, id: string, index: number, overIndex: number, draggedId: string, overId: string } =>
  ({
    type: REORDER_ARTICLE_IN_ROW,
    id: rowId,
    index: index,
    overIndex: overIndex,
    draggedId: draggedId,
    overId: overId
  })

export const removeArticleFromRow = (rowId: string, articleId: string): { type: string, id: string, articleId: string } => ({
  type: REMOVE_ARTICLE_FROM_ROW,
  id: rowId,
  articleId: articleId
})