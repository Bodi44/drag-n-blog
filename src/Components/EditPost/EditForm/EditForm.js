import React, { Component } from "react";
import TextareaAutosize from 'react-autosize-textarea'
import { WithContext as ReactTags } from "react-tag-input";

import "../../../Database/Database";
import Database from "../../../Database/Database";

import "../../../css-grid/grid.scss";
import "../../WriteBlog/WriteBlog.scss";

export  default class EditForm extends Component {
  static defaultProps = {
      keyCodes: {
          comma: 188,
          enter: 13,
      },
  };


    state = {
    data: this.props.data
  };

  handleTagsDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleTagsAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  handleSubmit = event => {
    const database = new Database(this.props.serverUrl + "articles");
    const { data } = this.state;
    database.update(data.id, data);
    this.props.history.push("/");
    event.preventDefault();
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      data: Object.assign({}, this.state.data, {
        [event.target.name]: event.target.value
      })
    });
  };

  render() {
    const { data } = this.state;
    const KeyCodes = this.props;
    const delimiters = [KeyCodes.comma, KeyCodes.enter];

    return (
      <form
        className={'WriteBlog'}
        onSubmit={this.handleSubmit}
      >
          <input
              className="WriteBlog__title"
              placeholder="Title"
              name={'title'}
              onChange={this.handleChange}
              defaultValue={data.title}
          />
          <input
              className="WriteBlog__author"
              placeholder="Author"
              name={'author'}
              onChange={this.handleChange}
              defaultValue={data.author}
          />
          <div>
              <ReactTags
                  tags={data.tags}
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
                  defaultValue={data.content}
              />
          </div>
          <button className={'WriteBlog__publish-button'} type="submit">
              Ready To Publish?
          </button>
      </form>
    );
  }
}
