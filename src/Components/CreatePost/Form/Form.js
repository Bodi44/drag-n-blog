import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";

import "../../../css-grid/grid.scss";
import "./Form.scss";

import "../../../Database/Database";
import Database from "../../../Database/Database";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      content: "",
      author: "Max Voloskiy",
      tags: []
    };
  }

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
    const { title, content, author, tags } = this.state;
    database.create(title.split(" ")[0], title, content, author, tags);

    this.props.history.push("/");
    event.preventDefault();
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const KeyCodes = {
      comma: 188,
      enter: 13
    };
    const delimiters = [KeyCodes.comma, KeyCodes.enter];
    const { tags } = this.state;
    return (
      <form
        className={"Form grid_10 container_12"}
        onSubmit={this.handleSubmit}
      >
        <div className={"Form__placeholder grid_1"}>
          <label htmlFor="file-input">
            <img
              className={"Form__placeholder-image"}
              src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_55/v1550486428/Drag'n'Blog/camera.png"
            />
          </label>
          <input
            className={"Form__placeholder-fileInput"}
            id="file-input"
            type="file"
          />
        </div>

        <div className={"Form__placeholder grid_11"}>
          <div>
            <input
              className="Form__placeholder-title"
              name="title"
              placeholder="Title"
              onChange={this.handleChange}
            />
          </div>

          <div className="Form__placeholder-tags">
            <ReactTags
              tags={tags}
              handleDelete={this.handleTagsDelete}
              handleAddition={this.handleTagsAddition}
              delimiters={delimiters}
            />
          </div>
          <div>
            <textarea
              className={"Form__placeholder-content"}
              name="content"
              placeholder={"Tell us your story..."}
              onChange={this.handleChange}
            />
          </div>
          <button className={"Form__placeholder-button"} type="submit">
            <p>Publish</p>{" "}
            <img
              src="https://res.cloudinary.com/maxvoloskiy/image/upload/c_scale,w_25/v1550482977/Drag'n'Blog/rocket.png"
              alt="rocket"
            />
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(Form);
