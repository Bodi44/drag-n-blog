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
import Tags from '../Tags'
import Textarea from '../Textarea'

import './WriteBlog.scss'
import BEM from '../../helpers/BEM'

const b = BEM('WriteBlog')
const SPACE_KYE_CODE = 32

const WriteBlog = props => {
  const title = useFormInput(props.title)
  const content = useFormInput(props.content)
  const author = useFormInput(props.author)

  const [tags, setTags] = useState(props.tags)
  const [input, setInput] = useState('')

  const handleInputChange = e => setInput(e.target.value)
  const handleInputKeyDown = e => {
    if ( e.keyCode === SPACE_KYE_CODE ) {
      const {value} = e.target;
      setTags([...tags, value])
      setInput('')
    }
    if ( tags.length && e.keyCode === 8 && !input.length ) {
      setTags(tags.slice(0, tags.length - 1))
    }
  }
  const handleRemoveTag = tag => {
    setTags(tags.filter((item, index) => index !== tag))
  }


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
        className={b('title')}
        placeholder="Title"
        name={'title'}
        {...title}
      />
      <input
        className={b('author')}
        placeholder="Author"
        name={'author'}
        {...author}
      />
      <Tags
        className={b('tags')}
        tags={tags}
        input={input}
        handleDelete={handleRemoveTag}
        handleInputKeyDown={handleInputKeyDown}
        handleInputChange={handleInputChange}
      />
      <Textarea
        className={b('content')}
        name="content"
        placeholder={'Tell us your story...'}
        {...content}
      />
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
  }),
)

export default enhancer(WriteBlog)
