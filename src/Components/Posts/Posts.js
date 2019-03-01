import React, { Component } from 'react'

import PostContainer from './PostsContainer'

export default class Posts extends Component {
  state = {
    postsContainers: [],
  }

  componentDidMount() {
    fetch('http://localhost:3001/layoutContainers')
      .then(resp => resp.json())
      .then(json => {
        this.setState({ postsContainers: json })
      })
  }

  render() {
    const { postsContainers } = this.state

    return (
      postsContainers.map(postContainer => (
        <PostContainer post={postContainer} key={postContainer.id}/>
      ))
    )
  }
}