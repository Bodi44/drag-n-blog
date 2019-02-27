import React from "react";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";

import MainPage from "../MainPage/MainPage/MainPage";
import ViewLayout from "../ViewLayout/ViewLayout";
import CreatePostPage from "../CreatePost/CreatePostPage/CreatePostPage";
import ViewPostPage from "../ViewPost/ViewPostPage/ViewPostPage";
import EditPost from "../EditPost/EditPost";

import "./App.scss";
import "../../css-grid/grid.scss";

const App = () => (
  <div className={"container_12"}>
    <Router>
      <>
        <div className={"grid_2 Header__logo Header__logo_create"}>
          <h1 className={"logo__top"}>Drag'n'Blog</h1>
          <p className={"logo__bottom"}>flexible-blog</p>
        </div>
        <nav className={"Header__navigation"}>
          <NavLink to={"/"} className={"navigation__item"} children={"Home"} />
          <NavLink
            to={"/layout"}
            className={"navigation__item"}
            children={"Posts"}
          />
        </nav>

        <div>
          <Route exact path={"/"} component={MainPage} />
          <Route path={"/layout"} component={ViewLayout} />
          <Route path={"/create_post"} component={CreatePostPage} />
          <Route path={"/view_post"} component={ViewPostPage} />
          <Route path={"/edit_post"} component={EditPost} />
        </div>
      </>
    </Router>
  </div>
);

export default App;
