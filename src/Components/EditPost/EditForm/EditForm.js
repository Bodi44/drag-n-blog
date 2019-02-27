import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import '../../../Database/Database'
import Database from '../../../Database/Database'

import '../../../css-grid/grid.scss'
import {WithContext as ReactTags} from "react-tag-input";
class EditForm extends Component {
  state = {
    data: this.props.data,
  };

  handleTagsDelete = (i) => {
      const { tags } = this.state;
      this.setState({
          tags: tags.filter((tag, index) => index !== i),
      });
  };

  handleTagsAddition = (tag) => {
      this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  handleSubmit = (event) => {
    const database = new Database(this.props.serverUrl + 'articles');
    const { data } = this.state;

    database.update(data.id, data);

    this.props.history.push('/');
    event.preventDefault()
  };

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      data: Object.assign({}, this.state.data, {
        [event.target.name]: event.target.value,
      }),
    });
  };

  render() {
    const { data } = this.state;

      const KeyCodes = {
          comma: 188,
          enter: 13,
      };
      const delimiters = [KeyCodes.comma, KeyCodes.enter];

    return (
      <form className={'Form grid_10 container_12'} onSubmit={this.handleSubmit}>
        <div className={'Form__placeholder grid_1'}>
          <label htmlFor="file-input">
            <img className={'Form__placeholder-image'}
                 src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_55/v1550486428/Drag'n'Blog/camera.png"/>
          </label>
          <input className={'Form__placeholder-fileInput'} id="file-input" type="file"/>
        </div>

        <div className={'Form__placeholder grid_11'}>
          <div>
            <input
              className="Form__placeholder-title"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
              defaultValue={data.title}
            />
          </div>

            <div className="Form__placeholder-tags">
                <ReactTags tags={data.tags}
                           handleDelete={this.handleTagsDelete}
                           handleAddition={this.handleTagsAddition}
                           delimiters={delimiters} />
            </div>

          <div>
        <textarea className={'Form__placeholder-content'} name="content" id="content"
                  placeholder={'Tell us your story...'} onChange={this.handleChange}
                  defaultValue={data.content}>
        </textarea>
          </div>
          <button className={'Form__placeholder-button'} type="submit"><p>Publish</p> <img
            src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_25/v1550482977/Drag'n'Blog/rocket.png"
            alt="rocket"/></button>
        </div>
      </form>
    )
  }
}

export default withRouter(EditForm)