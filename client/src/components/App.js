import React, { Component, Fragment } from "react";
import Home from "./pages/Home";
import Header from "./Header";
import Login from "./pages/Login";
import Join from "./pages/Join";
import SessionWrapperHOC from "./SessionWrapperHOC";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Ruut = ({ refetch, session }) => (
  <Router>
    <Fragment>
      <Header session={session} />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" render={() => <Login refetch={refetch} />} />
        <Route path="/join" render={() => <Join refetch={refetch} />} />
        <Redirect to="/" />
      </Switch>
    </Fragment>
  </Router>
);

const RuutWithWrapper = SessionWrapperHOC(Ruut);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div class="container">
          <RuutWithWrapper />
        </div>
      </div>
    );
  }
}
export default App;
