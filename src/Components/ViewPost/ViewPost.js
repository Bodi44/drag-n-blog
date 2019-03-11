// @flow
import React from "react";

import "../../css-grid/grid.scss";

import "./ViewPost.scss"

type ViewPostProps = {
  location: Object,
  article: Object
}

const ViewPost = (props: ViewPostProps) => {
  const article  = props.location.state.data;
  return (
    <div className={"ViewPost"}>
      <h1 className={"ViewPost__title"}>{article.title}</h1>
      <h3 className={"ViewPost__author"}>{article.author}</h3>
      <p className={"ViewPost__content"}>{article.content}</p>
      <ul className={"ViewPost__tags"}>
        {article.tags.map(tag => (
          <li className={"ViewPost__tags_tag"}>{tag.text}</li>
        ))}
      </ul>
    </div>
  )
};

export default ViewPost;
