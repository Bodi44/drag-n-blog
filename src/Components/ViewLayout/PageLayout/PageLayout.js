import React, { Component } from 'react'

import ArticleContainer from './ArticleContainer/ArticleContainer'

export default class PageLayout extends Component {
  state = {
    articleContainers: [],
  }

  componentDidMount() {
    fetch(this.props.serverUrl + 'layoutContainers')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ articleContainers: json })
      })
  }

  render() {
    const { articleContainers } = this.state

    return (
        articleContainers.map(articleContainer => (
          <ArticleContainer article={articleContainer} key={articleContainer.id}/>
        ))
    )
  }
}