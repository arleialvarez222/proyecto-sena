import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { StateProvider } from './context/store';
import { initialState } from './context/initial-state';
import { mainReducer } from './context/reducers/index';

ReactDOM.render(
  <>
    <StateProvider initialState={initialState} reducer={mainReducer} >
      <App />
   </StateProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
