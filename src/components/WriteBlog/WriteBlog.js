// @flow

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addArticle, updateArticle } from '../../actions'
import { getAllArticles } from '../../reducers'
import { withProps, compose } from 'recompose'
import { useFormInput } from '../../helpers/hooks'

import TextareaAutosize from 'react-autosize-textarea'
import Tags from '../Tags'

import './WriteBlog.scss'
import BEM from '../../helpers/BEM'
const b = BEM('WriteBlog')

const WriteBlog = props => {
  const title = useFormInput(props.title)
  const content = useFormInput(props.content)
  const author = useFormInput(props.author)

  const [tags, setTags] = useState(props.tags)

  const handleTagsDelete = i =>
    setTags(tags.filter((tag, index) => index !== i))

  const handleTagsAddition = tag => setTags([...tags, tag])

  const handleSubmit = event => {
    const article = {
      title: title.value,
      content: content.value,
      author: author.value,
      tags
    }

    if (props.location.state === undefined) props.addNewToArticles(article)
    else props.updateExistingArticle(props.id, article)

    props.history.push('/')
    event.preventDefault()
  }

  return (
    <form className={'WriteBlog'} onSubmit={handleSubmit}>
      <input
        className="WriteBlog__title"
        placeholder="Title"
        name={'title'}
        {...title}
      />
      <input
        className="WriteBlog__author"
        placeholder="Author"
        name={'author'}
        {...author}
      />
      <div>
        <Tags
          tags={tags}
          handleDelete={handleTagsDelete}
          handleAddition={handleTagsAddition}
        />
      </div>
      <div>
        <TextareaAutosize
          className={b('content')}
          name="content"
          placeholder={'Tell us your story...'}
          {...content}
        />
      </div>
      <button className={b('publish-button')} type="submit">
        Ready To Publish?
      </button>
    </form>
  )
}

const enhancer = compose(
  connect(
    state => ({ articles: getAllArticles(state) }),
    {
      addNewToArticles: addArticle,
      updateExistingArticle: updateArticle
    }
  ),

  withProps(({ location }) =>
    location.state
      ? location.state.data
      : {
          id: '',
          title: '',
          content: '',
          author: '',
          tags: []
        }
  )
)

export default enhancer(WriteBlog)
