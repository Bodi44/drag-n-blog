import React, { Component } from 'react'

import '../../../css-grid/grid.scss'
import './Post.scss'

class Post extends Component {
  render() {
    const { article } = this.props;
      const tags = article.tags.map((tag) =>
          <li className={'ViewPost__tags-tag'}>{tag.text}</li>
      );
    return (
      <div className={'ViewPost grid_10'}>
        <h1 className={'ViewPost-header'}>{article.title}</h1>
        <p className={'ViewPost-content'}>{article.content}</p>
        <ul className={'ViewPost__tags'}>{tags}</ul>
      </div>
    )
  }
}

export default Post