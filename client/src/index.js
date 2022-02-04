import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import store from "./Redux/Store"
import App from './App';
import Login from '../src/Components/Login'

ReactDOM.render(
  <React.StrictMode>

    <Provider store={store}>
      <Login />
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);

