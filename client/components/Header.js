import React, { Component } from 'react';

class HeaderView extends Component {
  render() {
    return( 
        <div id="header" className="container-full">
            <div className="container">     
                <img src={require('../images/coreval_logo_small.png')} className="img-responsive" id="logo" alt="logo"></img>
            </div>
        </div>
    );
  }
}

export default HeaderView;