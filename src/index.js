import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './Routers/AppRouter';
import './style/main.css'


ReactDOM.render(
  <React.StrictMode>
    <AppRouter/>
  </React.StrictMode>,
  document.getElementById('root')
);
