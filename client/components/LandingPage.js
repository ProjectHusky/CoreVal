import React, { Component } from 'react';

class LandingPageView extends Component {
  render() {
    return( 
        <div className="container" id="mainPage">
            <img src={require('../images/main_page.png')} className="img-responsive" alt="instructions"></img>
        </div>
    )
  }
}

export default LandingPageView;