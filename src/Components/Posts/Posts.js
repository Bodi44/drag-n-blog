// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostContainer from './PostsContainer'
import { fetchLayoutArticles } from '../../actions'

type PostsProps = {
  error: null | Object,
  loading: boolean,
  layoutArticles: Array<any>,
  fetchContent: () => Promise<any>,
  location?: Object,
  match?: Object
}

class Posts extends Component<PostsProps> {
  componentDidMount() {
    this.props.fetchContent()
  }

  render() {
    const { error, loading, layoutArticles } = this.props

    if (error)
      return <div>Error! {error.message}</div>

    if (loading)
      return <div>Loading...</div>

    return (
      layoutArticles.map(article => (
        <PostContainer post={article} key={article.id}/>
      ))
    )
  }
}

const mapStateToProps = state => ({
  layoutArticles: state.layoutArticles.layoutArticles,
  loading: state.layoutArticles.loading,
  error: state.layoutArticles.error,
})

const mapDispatchToProps = dispatch => {
  return {
    fetchContent: () => dispatch(fetchLayoutArticles()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts)