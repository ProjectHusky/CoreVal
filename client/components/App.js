import React, { Component } from 'react';

import QueryFormView from "./QueryForm"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="jumbotron-fluid mt-4">
          {/* <img src={require('../src/storm.png')} className="img" alt="logo"></img> */}
        </header>
        <div className="container">
          <QueryFormView/> 
        </div>
      </div>
    );
  }
}

export default App;
