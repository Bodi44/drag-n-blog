import React, { Component } from 'react'
import { connect } from 'react-redux'

class ArticleList extends Component {
  render() {
    return (
      <ul>
        {this.props.articles.map(
          article => (
            <li key={article.id}>{article.title}</li>
          ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
  }
}

export default connect(mapStateToProps)(ArticleList)