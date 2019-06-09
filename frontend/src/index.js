import React from 'react'
import ReactDOM from 'react-dom'

import Provider from './components/Provider'
import App from './components/App'
import configureStore from './configureStore'

ReactDOM.render(
  <Provider store={configureStore()}>
    <App/>
  </Provider>,
  document.getElementById('root')
)