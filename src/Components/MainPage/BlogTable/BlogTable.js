import React, { Component } from 'react'
import update from 'immutability-helper'

import LayoutArticle from './LayoutArticle'

import { generateUniqueId } from '../../../helpers/generateUniqueId'
import Database from '../../../Database/Database'

import './BlogTable.scss'

class BlogTable extends Component {
  state = {
    layoutArticles: [],
  }

  componentDidMount() {
    fetch(this.props.serverUrl + 'layoutContainers')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ layoutArticles: json })
      })
  }

  addArticleToLayout = () => {
    const dataBase = new Database(this.props.serverUrl + 'layoutContainers')

    const newItem = {
      title: '',
      content: '',
      date: Database.dateToString(new Date()),
      author: '',
      id: generateUniqueId(),
    }

    this.setState(
      update(this.state, {
        layoutArticles: {
          $push: [newItem],
        },
      }),
    )

    dataBase.create(newItem.id, newItem.title, newItem.content, newItem.author)
  }

  updateArticleInLayout = (id, data) => {
    const newState = Object.assign({}, this.state.layoutArticles)

    Object.keys(newState).forEach(key => {
      if (newState[key].id === id) {
        newState[key].title = data.title
        newState[key].content = data.content
        newState[key].date = Database.dateToString(new Date())
        newState[key].author = data.author
      }
    })

    this.setState({ newState })
  }

  removeArticleFromLayout = id => {
    const dataBase = new Database(this.props.serverUrl + 'layoutContainers')
    const newState = this.state.layoutArticles.filter(article => article.id !== id)

    this.setState({ layoutArticles: newState })
    dataBase.delete(id)
  }

  render() {
    const { serverUrl, containerId } = this.props
    const { layoutArticles } = this.state

    return (
      <div className={'BlogTable'}>
        {layoutArticles.map(article => (
          <LayoutArticle
            layoutArticles={layoutArticles}
            article={article}
            articleId={containerId}
            key={article.id}
            serverUrl={serverUrl}
            updateArticle={this.updateArticleInLayout}
            removeArticle={this.removeArticleFromLayout}
          />
        ))}
        <button
          className={'BlogTable__add-container'}
          onClick={this.addArticleToLayout}
        >
          Add container
        </button>
      </div>
    )
  }
}

export default BlogTable