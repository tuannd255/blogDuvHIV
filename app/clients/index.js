import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from '../reducers/rootReducers';

// initialState
const initialState = {}

// Create store
const store = createStore(rootReducer, initialState);

const appRoot = (
  <Provider store={store}>
    <div>
      HELLO WORLD
    </div>
  </Provider>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(appRoot, document.getElementById('root'),)
});
