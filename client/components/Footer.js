import React, { Component } from 'react';

class FooterView extends Component {
  render() {
    return( 
        <div className="container-full" id="footer">
            <div className="container">
              <div className="row">
                <div className="col-md-6 about">
                  <p className="mb-0 pb-0">Created by ProjectHusky, 2017</p>
                  <a className="contributor" href="https://github.com/UWHack/CoreVal/">
                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                  </a>
                </div>
                <div className="col-md-6 about">
                  <p className="mb-0 pb-0">Contributers</p>
                  <p>
                    <span><a className="contributor" href="https://www.linkedin.com/in/tuan-ma-a8661147/">Tuan Ma /</a></span>
                    <span><a className="contributor" href="https://www.linkedin.com/in/william-k/">William Kim /</a></span> 
                    <span><a className="contributor" href="https://www.linkedin.com/in/thoa-nguyen-4a06b3147/">Thoa Nguyen /</a></span>
                    <span><a className="contributor" href="https://www.linkedin.com/in/ttonyvo/">Tony Vo</a></span>
                  </p>
                </div>
              </div>
            </div>
        </div>
    );
  }
}

export default FooterView;