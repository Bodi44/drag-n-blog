import React, { Component } from 'react'

import './ArticleContainer.scss'
import '../../../../css-grid/grid.scss'

export default class ArticleContainer extends Component {
  render() {
    const { article } = this.props

    return (
      <div className={'grid_12 ArticleContainer'}>
        <h2>{article.title}</h2>
        <p>{article.content}</p>
        <small>{article.author}</small>
        <time>{article.date}</time>
      </div>
    )
  }
}