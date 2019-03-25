import { FETCH_ARTICLES_BEGIN, FETCH_ARTICLES_FAILURE, FETCH_ARTICLES_SUCCESS } from '../../actions'

const loading = (state , action) => {
  switch (action.type) {
    case FETCH_ARTICLES_BEGIN:
      return true
    case FETCH_ARTICLES_SUCCESS:
      return false
    case FETCH_ARTICLES_FAILURE:
      return false
    default:
      return state
  }
}

export default loading