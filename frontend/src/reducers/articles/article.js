import Database from '../../Database'
import dateToString from '../../helpers/dateToString'

import {
  ADD_ARTICLE,
  FETCH_ARTICLES_SUCCESS,
  REMOVE_ARTICLE,
  UPDATE_ARTICLE
} from '../../actions'

const database = new Database('http://localhost:4000/articles')

const article = (state, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_SUCCESS:
      return action.payload.articles
    case ADD_ARTICLE:
      database.create(action)
      return {
        id: action.id,
        title: action.title,
        content: action.content,
        date: action.date,
        author: action.author,
        tags: action.tags
      }
    case REMOVE_ARTICLE:
      database.delete(action.id)
      return
    case UPDATE_ARTICLE:
      database.update(action.id, {
        title: action.title,
        content: action.content,
        author: action.author,
        tags: action.tags
      })
      return {
        id: action.id,
        title: action.title,
        content: action.content,
        date: dateToString(new Date()),
        author: action.author,
        tags: action.tags
      }
    default:
      return state
  }
}

export default article
