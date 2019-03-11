// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextareaAutosize from 'react-autosize-textarea'
import { WithContext as ReactTags } from 'react-tag-input'

import { addArticle, updateArticle } from '../../actions'

import './WriteBlog.scss'

type WriteBlogProps = {
  keyCodes: Object,
  location: Object,
  history: Object,
  addNewToArticles: ({id: string,
                      title: string,
                      content: string,
                      author: string,
                      tags: Array<any>}) => void,
  updateExistingArticle: (id: string, Object) => void
}

type WriteBlogState = {
  id: string,
  title: string,
  content: string,
  author: string,
  tags: Array<any>
}

class WriteBlog extends Component<WriteBlogProps, WriteBlogState> {

  static defaultProps = {
    keyCodes: {
      comma: 188,
      enter: 13,
    },
  }

  constructor(props) {
    super(props)
    this.state = props.location.state ?
      props.location.state.data :
      {
        id: '',
        title: '',
        content: '',
        author: '',
        tags: [],
      }
  }

  handleTagsDelete = i => {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i),
    })
  }

  handleTagsAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }))
  }

  handleSubmit = event => {
    if (this.props.location.state === undefined)
      this.props.addNewToArticles(this.state)
    else
      this.props.updateExistingArticle(this.state.id, this.state)

    this.props.history.push('/')
    event.preventDefault()
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  render() {
    const { keyCodes } = this.props
    const delimiters = [keyCodes.comma, keyCodes.enter]
    const { tags } = this.state
    return (
      <form className={'WriteBlog'} onSubmit={this.handleSubmit}>
        <input
          className="WriteBlog__title"
          placeholder="Title"
          name={'title'}
          onChange={this.handleChange}
          defaultValue={this.state.title}
        />
        <input
          className="WriteBlog__author"
          placeholder="Author"
          name={'author'}
          onChange={this.handleChange}
          defaultValue={this.state.author}
        />
        <div>
          <ReactTags
            tags={tags}
            placeholder={'#add tags'}
            handleDelete={this.handleTagsDelete}
            handleAddition={this.handleTagsAddition}
            delimiters={delimiters}
            allowDragDrop={false}
          />
        </div>
        <div>
          <TextareaAutosize
            className={'WriteBlog__content'}
            name="content"
            placeholder={'Tell us your story...'}
            onChange={this.handleChange}
            defaultValue={this.state.content}
          />
        </div>
        <button className={'WriteBlog__publish-button'} type="submit">
          Ready To Publish?
        </button>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  articles: state.articles.articles,
})

const mapDispatchToProps = dispatch => {
  return {
    addNewToArticles: (data) => {
      dispatch(addArticle(data))
    },
    updateExistingArticle: (id, data) => {
      dispatch(updateArticle(id, data))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WriteBlog)
