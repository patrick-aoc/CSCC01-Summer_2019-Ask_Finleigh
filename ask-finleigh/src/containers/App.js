import React, { Component } from "react";

import "../styles/App.css";
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import Home from "../pages/Home";
import MainContainer from "../pages/MainContainer";
import ROUTES from "../Routes";

import { withFirebase } from '../firebase';
// import { withAuthentication } from '../user'


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path={ROUTES.LANDING} component={withRouter(withFirebase(Home))} />
          <Route exact={true} path={ROUTES.MAIN_CHAT} component={withRouter(withFirebase(MainContainer))} />
        </div>
      </Router>
    );
  }
}

// export default withAuthentication(App);