import React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.js";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Archives from "./components/Archives.jsx";
import CallFeed from "./components/CallFeed.jsx";


const App = () => {
  return (
    <section
      className="container nunito-sans-500"
      style={{ backgroundColor: "#F0F2F6" }}
    >
      <Header />
      <Switch>
        <Route exact path="/">
          <div className="container-view">
            <CallFeed />
          </div>
        </Route>
        <Route exact path="/archives">
          <div className="container-view">
            <Archives />
          </div>
        </Route>
      </Switch>
      <Footer />
    </section>
  );
};

const mapStateToProps = (state) => {
  return ({
    calls: state.calls,
    archives: state.archives,
    error: state.error
  })
}

export default connect(mapStateToProps)(App);
