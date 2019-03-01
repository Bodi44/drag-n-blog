import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import Layout from './Layout'
import Routes from './Routes'

const App = () => (
  <Router>
    <Layout>
      <Routes/>
    </Layout>
  </Router>
)

export default App
