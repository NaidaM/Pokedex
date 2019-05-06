import React, { Component } from 'react';
import Pokemon from "./Pokemon.js"
import { BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <Route path="/:name?" component={Pokemon}/>
        </div>
      </Router>
    );
  }
}

export default App;
