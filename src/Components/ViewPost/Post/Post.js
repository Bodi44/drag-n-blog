import React from "react";

import "../../../css-grid/grid.scss";
import "./Post.scss";

const Post = ({ article }) => (
  <div className={"ViewPost"}>
    <h1 className={"ViewPost__title"}>{article.title}</h1>
    <h3 className={"ViewPost__author"}>{article.author}</h3>
    <p className={"ViewPost__content"}>{article.content}</p>
    <ul className={"ViewPost__tags"}>
      {article.tags.map(tag => (
        <li className={"ViewPost__tags-tag"}>{tag.text}</li>
      ))}
    </ul>
  </div>
);

export default Post;
