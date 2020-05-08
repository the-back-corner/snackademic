import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '20px', paddingBottom: '20px' };
    return (
        <footer>
          <div className="footer-background" >
          <div style={divStyle} className="ui center aligned container">
              Designed by <a href="https://github.com/the-back-corner">The Back Corner</a> <br />
              Team Members:  Clark Whitehead | David Harris | Jasmine Singleton | Ramit Islam<br />
              University of Hawaii | Honolulu, Hawaii <br />
          </div>
          </div>
        </footer>
    );
  }
}

export default Footer;
