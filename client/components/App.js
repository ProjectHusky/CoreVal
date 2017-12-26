import React, { Component } from 'react';
import QueryFormView from "./QueryForm"
import HeaderView from "./Header"
import FooterView from "./Footer"
class App extends Component {
  render() {
    return( 
      <div className="container-full" id ="app-body">
          <HeaderView/>
          <QueryFormView/>
          <FooterView/>
      </div>
    );
  }
}

export default App;