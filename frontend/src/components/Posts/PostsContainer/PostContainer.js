// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import { shortenContent } from '../../../helpers/shortenContent'

import './PostContainer.scss'
import '../../../grid.scss'
import BEM from '../../../helpers/BEM'

const b = BEM('PostContainer')

type PostContainerProps = {
  articlesInRow: Array<string>,
  parametersOfRowArticles: Array<Object>
}

const PostContainer = ({ articlesInRow, parametersOfRowArticles }: PostContainerProps) => {
  return (
    <div className={'grid grid_no-transition'}>
      {articlesInRow.map(article => (
        <Link to={{ pathname: '/view_post', state: { data: article } }}
              className={`grid__cell_${parametersOfRowArticles.filter(param => param.id === article.id)[0].col} ${b()}`}>
          <img src={article.image} className={b('image')} alt="visualization of post"/>
          <div className={b('info')}>
            <h2 className={b('title')}>{article.title}</h2>
            <p className={b('content')}>{shortenContent(article.content, 100)}</p>
            <small className={b('author')}>{article.author}</small>
            <time className={b('date')}>{article.date}</time>
          </div>
        </Link>
        )
      )}
    </div>
  )
}

export default PostContainer