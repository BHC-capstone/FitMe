import React, { Component } from 'react';
import { Container } from 'react-bootstrap';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends Component {
  render() {
    return (
      <footer className="footer px-0 px-lg-3">
        <Container fluid>
          <nav>
            <p className="copyright text-center">
              © {new Date().getFullYear()}{' '}
              <a href="http://localhost:3000">BHC</a>, made with love for a
              better web
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default Footer;
