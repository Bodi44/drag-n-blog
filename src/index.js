import React from "react";
import ReactDOM from "react-dom";

import Provider from "./components/Provider";
import configureStore from "./configureStore";
import Layout from "./components/Layout";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Layout />
  </Provider>,
  document.getElementById("root")
);
