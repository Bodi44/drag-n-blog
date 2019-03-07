import Database from '../Database/Database'

import {
  FETCH_LAYOUT_ARTICLES_BEGIN,
  FETCH_LAYOUT_ARTICLES_SUCCESS,
  FETCH_LAYOUT_ARTICLES_FAILURE,
  ADD_LAYOUT_ARTICLE,
  UPDATE_LAYOUT_ARTICLE,
  REMOVE_LAYOUT_ARTICLE,
} from '../actions'

const database = new Database('http://localhost:3001/layoutContainers')

const initialState = {
  layoutArticles: [],
  loading: false,
  error: null,
}

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LAYOUT_ARTICLES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_LAYOUT_ARTICLES_SUCCESS:
      return {
        ...state,
        loading: false,
        layoutArticles: action.payload.layoutArticles,
      }
    case FETCH_LAYOUT_ARTICLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        layoutArticles: [],
      }
    case ADD_LAYOUT_ARTICLE:
      database.create(action)
      return {
        ...state,
        layoutArticles: [
          ...state.layoutArticles,
          {
            id: action.id,
            title: action.title,
            content: action.content,
            date: action.date,
            author: action.author,
            tags: action.tags,
          },
        ],
      }
    case REMOVE_LAYOUT_ARTICLE:
      database.delete(action.id)
      return {
        ...state,
        layoutArticles: [
          ...state.layoutArticles.filter(article =>
            article.id !== action.id,
          )],
      }
    case UPDATE_LAYOUT_ARTICLE:
      database.update(action.id, {
        title: action.title,
        content: action.content,
        author: action.author,
        tags: action.tags,
      })
      const newState = Object.assign({}, state)
      newState.layoutArticles.forEach(article => {
        if (article.id === action.id) {
          article.title = action.title
          article.content = action.content
          article.data = Database.dateToString(new Date())
          article.author = action.author
          article.tags = action.tags
        }
      })
      return newState
    default:
      return state
  }
}

export default layoutReducer
