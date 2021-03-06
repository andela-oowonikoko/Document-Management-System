import ReactDom from 'react-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/common/App.component';
import rootReducer from './rootReducer';
import { setCurrentUser } from './actions/loginActions';
import setHeaderToken from './utils/setHeaderToken';

require('./font-awesome/scss/font-awesome.scss');

const history = createHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.token) {
  setHeaderToken(localStorage.token);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.token)));
}

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-app')
);
