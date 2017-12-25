import React, { Component } from 'react';
import QueryFormView from "./QueryForm"

class App extends Component {
  render() {
    return( 
      <div className="container-full" id ="app-body">
          <div id="header" className="container-full">
            <div className="container">     
              <img src={require('../images/coreval_logo.png')} className="img-responsive" id="logo" alt="logo"></img>
            </div>
          </div>

          <div className="container-full mb-4" id="searchResults">
            <QueryFormView/>
          </div>
          <div className="container-full" id="footer">
              <div className="container">THIS IS THE FOOTER</div>
          </div>
      </div>
    );
  }
}

export default App;