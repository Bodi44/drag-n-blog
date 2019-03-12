import React from 'react'
import ReactDOM from 'react-dom'

import Provider from './Components/Provider'
import configureStore from './store'
import Layout from './Components/Layout'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Layout/>
  </Provider>,
  document.getElementById('root'),
)

