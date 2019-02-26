import React, { Component } from 'react'

import '../../../css-grid/grid.scss'
import './Post.scss'

class Post extends Component {
  render() {
    const { article } = this.props;
    return (
      <div className={'ViewPost grid_10'}>

        <h1 className={'ViewPost-header'}>{article.title}</h1>

        <p className={'ViewPost-content'}>{article.content}</p>

        <ul className={'ViewPost__tags'}>
          <li className={'ViewPost__tags-tag'}>#enterpreneurship</li>
          <li className={'ViewPost__tags-tag'}>#business</li>
          <li className={'ViewPost__tags-tag'}>#partnership</li>
        </ul>
      </div>
    )
  }
}

export default Post