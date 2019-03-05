import Database from '../Database/Database'

const layoutReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LAYOUT_ARTICLE':
      return [
        ...state,
        {
          id: action.id,
          title: action.title,
          content: action.content,
          date: action.date,
          author: action.author,
          tags: action.tags,
        },
      ]
    case 'REMOVE_LAYOUT_ARTICLE':
      return state.filter(article => article.id !== action.id)
    case 'UPDATE_LAYOUT_ARTICLE':
      const newState = Object.assign({}, state)
      Object.keys(newState).forEach(key => {
        if (newState[key].id === action.id) {
          newState[key].title = action.title
          newState[key].content = action.content
          newState[key].date = Database.dateToString(new Date())
          newState[key].author = action.author
          newState[key].tags = action.tags
        }
      })
      return newState
    default:
      return state
  }
}

export default layoutReducer
