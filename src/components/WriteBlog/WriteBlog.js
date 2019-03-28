// @flow
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addArticle, fetchArticles, updateArticle } from '../../actions'
import {
  getArticlesById,
  isAllArticlesLoading,
  isAllArticlesLoadingError
} from '../../reducers'
import {
  withProps,
  compose,
  branch,
  renderComponent,
  flattenProp
} from 'recompose'
import { useFormInput } from '../../helpers/hooks'
import Textarea from 'react-textarea-autosize'

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
    event.preventDefault()
    const article = {
      title: title.value,
      content: content.value,
      author: author.value,
      tags,
      inLayout: false
    }
    props.publishArticle(article)
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
        <Textarea
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
    (state, { match }) => {
      const { id } = match.params
      return {
        article: getArticlesById(id, state),
        isLoading: isAllArticlesLoading(state),
        isError: isAllArticlesLoadingError(state)
      }
    },
    {
      fetchArticles,
      addNewToArticles: addArticle,
      updateExistingArticle: updateArticle
    }
  ),

  withProps(({ match, article, isLoading, isError, fetchArticles }) => {
    const { id } = match.params
    if (!id) {
      return {
        article: {
          title: '',
          content: '',
          author: '',
          tags: [],
          inLayout: false
        }
      }
    } else if (!article && !isLoading && !isError) {
      return fetchArticles()
    }
  }),

  branch(({ isLoading }) => isLoading, renderComponent(() => 'Loading...')),
  branch(
    ({ isError }) => isError,
    renderComponent(() => 'Some error happened...')
  ),
  flattenProp('article'),
  withProps(({ history, match, addNewToArticles, updateExistingArticle }) => {
    const { id } = match.params

    const publishAction = id
      ? updateExistingArticle.bind(null, id)
      : addNewToArticles

    return {
      publishArticle: article => {
        publishAction(article)
        history.push('/')
      }
    }
  })
)

export default enhancer(WriteBlog)
