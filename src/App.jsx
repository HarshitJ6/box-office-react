import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Show from "./Pages/Show";
import Starred from "./Pages/Starred";

const App = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/starred">
        <Starred />
      </Route>
      <Route path="/show/:id">
        <Show />
      </Route>

      <Route> 404 Not Found</Route>
    </Switch>
  );
};

export default App;
