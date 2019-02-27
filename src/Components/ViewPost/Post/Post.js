import React from "react";

import "../../../css-grid/grid.scss";
import "./Post.scss";

const Post = ({ article }) => (
  <div className={"ViewPost grid_10"}>
    <h1 className={"ViewPost-header"}>{article.title}</h1>
    <p className={"ViewPost-content"}>{article.content}</p>
    <ul className={"ViewPost__tags"}>
      {article.tags.map(tag => (
        <li className={"ViewPost__tags-tag"}>{tag.text}</li>
      ))}
    </ul>
  </div>
);

export default Post;
