import React, { PureComponent } from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import $ from 'jquery';
import './style.css';
import history from '../history';
import Work from "./pages/Work";
import Login from "./pages/Login";

export const DEFAULT_LANG = 'ru';

class App extends PureComponent {
  constructor(props) {
    super(props);

    console.log('App constructor', props);
    this.state = {

    };
  }

  componentDidMount() {

  }

  componentDidUpdate(prevProps) {

  }

  render() {
    const { messages, lang } = this.state;

    console.log('app', this)

    return (
      <Router history={history}>
        <Route path="/" exact render={() => <Redirect to="/work" />} />
        <Route path="/work" component={Work} />
        <Route path="/login" component={Login} />
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

export default hot(connect(mapStateToProps)(App));
