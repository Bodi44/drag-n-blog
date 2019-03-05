import { generateUniqueId } from '../helpers/generateUniqueId'
import Database from '../Database/Database'

export const addArticle = (title, content, author, tags) => ({
  type: 'ADD_ARTICLE',
  id: generateUniqueId(),
  title,
  content,
  date: Database.dateToString(new Date()),
  author,
  tags,
})

export const removeArticle = id => ({
  type: 'REMOVE_ARTICLE',
  id,
})

export const updateArticle = (id, newArticleData) => ({
  type: 'UPDATE_ARTICLE',
  newArticleData,
})

export const addLayoutArticle = (title, content, author, tags) => ({
  type: 'ADD_LAYOUT_ARTICLE',
  id: generateUniqueId(),
  title,
  content,
  date: Database.dateToString(new Date()),
  author,
  tags,
})

export const updateLayoutArticle = (id, newLayoutData) => ({
  type: 'UPDATE_LAYOUT_ARTICLE',
  newLayoutData,
})

export const removeLayoutArticle = id => ({
  type: 'REMOVE_LAYOUT_ARTICLE',
  id,
})
