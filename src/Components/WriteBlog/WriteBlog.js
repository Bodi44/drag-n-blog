import React, { Component } from 'react'
import TextareaAutosize from 'react-autosize-textarea'
import { WithContext as ReactTags } from 'react-tag-input'

import { generateUniqueId } from '../../helpers/generateUniqueId'

import Database from '../../Database/Database'

import './WriteBlog.scss'

export default class WriteBlog extends Component {
  static defaultProps = {
    keyCodes: {
      comma: 188,
      enter: 13,
    },
  };

  state = {
    id: '',
    title: '',
    content: '',
    author: '',
    tags: [],
  };

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
    const database = new Database('http://localhost:3001/' + 'articles')
    const { title, content, author, tags } = this.state
    database.create(generateUniqueId(), title, content, author, tags)
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
        />
        <input
          className="WriteBlog__author"
          placeholder="Author"
          name={'author'}
          onChange={this.handleChange}
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
          />
        </div>
        <button className={'WriteBlog__publish-button'} type="submit">
          Ready To Publish?
        </button>
      </form>
    )
  }
}
