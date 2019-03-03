import Database from '../Database/Database'

const articleReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ARTICLE':
      return [
        ...state,
        {
          id: action.id,
          content: action.content,
          date: action.date,
          author: action.author,
        },
      ]
    case 'REMOVE_ARTICLE':
      return state.filter(item => item.id !== action.id)
    case 'UPDATE_ARTICLE':
      const newState = Object.assign({}, state)
      Object.keys(newState).forEach(key => {
        if (newState[key].id === action.id) {
          newState[key].title = action.title
          newState[key].content = action.content
          newState[key].date = Database.dateToString(new Date())
          newState[key].author = action.author
        }
      })
      return newState
    default:
      return state
  }
}

export default articleReducer
