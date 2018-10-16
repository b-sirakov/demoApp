import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Welcome from './components/welcome';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={NavBar} />
          <Route exact path="/welcome" component={Welcome} />
        </div>
      </Router>
    );
  }
}

export default App;
