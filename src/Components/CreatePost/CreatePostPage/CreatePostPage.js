import React from "react";

import Form from "../Form";

import "../../../css-grid/grid.scss";

const jsonServerUrl = "http://localhost:3001/";

const CreatePostPage = () => (
  <div className={"container_12"}>
    <Form serverUrl={jsonServerUrl} />
  </div>
);

export default CreatePostPage;
