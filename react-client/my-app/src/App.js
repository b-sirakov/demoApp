import React, { Component } from 'react';
import Home from './components/Home';
import Welcome from './components/Welcome';
import CreateCase from './components/CreateCase';
import CreateNote from './components/CreateNote';
import TestRoute from './components/TestRoute';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/createNote" component={CreateNote} />
          <Route exact path="/testRoute" component={TestRoute} />
        </div>
      </Router>
    );
  }
}

export default App;
