import { generateUniqueId } from "../helpers/generateUniqueId";
import Database from "../Database/Database";

export const addArticle = (title, content, author) => ({
  type: "ADD_ARTICLE",
  id: generateUniqueId(),
  content,
  date: Database.dateToString(new Date()),
  author
});

export const removeArticle = id => ({
  type: "REMOVE_ARTICLE",
  id
});

export const updateArticle = (id, data) => ({
  type: "UPDATE_ARTICLE",
  data
});
