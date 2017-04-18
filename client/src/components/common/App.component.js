import React, { Component } from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Index from './Index.component';
import Login from '../login/LoginPage.component';
import Signup from '../signup/SignupPage.component';
import Document from '../document/DocumentPage.component';

class App extends Component {
  /**
   * renders the app component
   * @returns {void}
   * @memberOf App
   */
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/app/home" component={Index} />
          <Route path="/app/login" component={Login} />
          <Route path="/app/signup" component={Signup} />
          <Route path="/app/document" component={Document} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
