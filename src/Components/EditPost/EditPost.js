import React from "react";

import EditForm from "./EditForm/EditForm";

import "../../css-grid/grid.scss";

const jsonServerUrl = "http://localhost:3001/";

const EditPost = props => {
  const { data } = props.location.state;

  return <EditForm serverUrl={jsonServerUrl} data={data} />;
};

export default EditPost;
