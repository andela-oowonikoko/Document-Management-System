import ReactDom from 'react-dom';
import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App.component';
import rootReducer from './rootReducer';

const history = createHistory();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

ReactDom.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react-app')
);
