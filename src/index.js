import React from 'react'
import ReactDOM from 'react-dom'

import App from './Components/App/App'

import Database from './Database/Database'

const url = 'http://localhost:3001/'
const database = new Database(url + 'layoutContainers')
const data = {
  "id": "post-4",
  "title": "How Top-Performing College Grads Fall Into the ‘Prestige Career’ Trap",
  "content": "We funnel our highest achievers into consulting and finance — and it’s hurting all of us...",
  "author": "Indra Sofian",
  "date": "~24min."
}
// database.update('layout-1', data)

ReactDOM.render(<App/>, document.getElementById('root'))

