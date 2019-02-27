import React from "react";

import PageLayout from "./PageLayout/PageLayout";

import "../../css-grid/grid.scss";

const jsonServerUrl = "http://localhost:3001/";

const ViewLayout = () => <PageLayout serverUrl={jsonServerUrl} />;

export default ViewLayout;
