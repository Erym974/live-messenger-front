import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

import store from './rootStore';
import { Provider } from 'react-redux';

import 'react-tooltip/dist/react-tooltip.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.Fragment>
    <Provider store={store}>
      <App />
    </Provider>
  </React.Fragment>
);
