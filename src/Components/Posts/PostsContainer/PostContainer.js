// @flow
import React from 'react'
import { Link } from 'react-router-dom'

import './PostContainer.scss'
import { shortenContent } from '../../../helpers/shortenContent'

type PostContainerProps = {
  post: Object,
  key: string
}

const PostContainer = (props: PostContainerProps) => {
  const { post } = props

  return (
    <Link to={{ pathname: '/view_post', state: { data: post } }} className={'PostContainer'}>
      <h2 className={'PostContainer__title'}>{post.title}</h2>
      <p className={'PostContainer__content'}>{shortenContent(post.content, 100)}</p>
      <small className={'PostContainer__author'}>{post.author}</small>
      <time className={'PostContainer__date'}>{post.date}</time>
    </Link>
  )
}

export default PostContainer