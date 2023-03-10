import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UseProvider from "./UseContext/UseContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UseProvider>
    <App />
    </UseProvider>
   
  </React.StrictMode>
);

