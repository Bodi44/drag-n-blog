import React from "react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import Sidebar from "../Sidebar/Sidebar";
import BlogTable from "../BlogTable/BlogTable";

import "./MainPage.scss";

const jsonServerUrl = "http://localhost:3001/";

const MainPage = () => {
  return (
    <main className={"MainPage__content"}>
      <Sidebar containerId={1} serverUrl={jsonServerUrl} />
      <BlogTable containerId={2} serverUrl={jsonServerUrl} />
    </main>
  );
};

export default DragDropContext(HTML5Backend)(MainPage);
