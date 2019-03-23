import { FETCH_ARTICLES_BEGIN, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS } from '../actions'

const error = (state, action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return null
    case FETCH_ARTICLES_SUCCESS:
      return null
    case FETCH_ARTICLES_FAILURE:
      return action.payload.error
    default:
      return state
  }
}

export default error