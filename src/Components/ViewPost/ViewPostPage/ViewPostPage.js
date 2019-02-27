import React from "react";

import Post from "../Post/Post";

import "../../../css-grid/grid.scss";

const jsonServerUrl = "http://localhost:3001/";

const ViewPostPage = props => {
  const { data } = props.location.state;
  return <Post serverUrl={jsonServerUrl} article={data} />;
};

export default ViewPostPage;
