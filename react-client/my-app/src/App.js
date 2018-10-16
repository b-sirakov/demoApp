import React, { Component } from 'react';
import Home from './components/Home';
import Welcome from './components/Welcome';

import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={Welcome} />
        </div>
      </Router>
    );
  }
}

export default App;
