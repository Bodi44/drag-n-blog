import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './ArticleContainer.scss'
import '../../../../css-grid/grid.scss'

export default class ArticleContainer extends Component {
  render() {
    const { article } = this.props

    return (
      <Link to={{pathname: '/view_post', state: {data: article}}} className={'grid_12 ArticleContainer'}>
          <h2 className={'ArticleContainer__title'}>{article.title}</h2>
          <p className={'ArticleContainer__content'}>{article.content.split(' ').slice(0,100).join(' ')}</p>
          <small className={'ArticleContainer__author'}>{article.author}</small>
          <time className={'ArticleContainer__date'}>{article.date}</time>
      </Link>
    )
  }
}