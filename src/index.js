import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import articleReducers from './reducers/articleReducers'
import App from './Components/App/App'
import { Provider } from 'react-redux'

const store = createStore(articleReducers)

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'),
)

