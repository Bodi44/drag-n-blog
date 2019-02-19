import React, { Component } from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import Sidebar from '../Sidebar/Sidebar'
import BlogTable from '../BlogTable/BlogTable'
import Header from '../Header/Header'
import Post from '../Post/Post'
import { postList, blogContainers } from '../../helpers/initialData'

import './App.scss'
import '../../css-grid/grid.scss'
import Form from "../Form/From";

class App extends Component {
  componentDidMount() {
    let url = 'http://localhost:3001/articles';
    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        this.setState({ articles: data })
      })
  }

  render() {
    return (
      <div className={'container_12'}>
          <Header/>
          <Form/>
          {/*<Sidebar id={1} items={postList}/>*/}
          {/*<BlogTable id={2} items={blogContainers}/>*/}
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(App)