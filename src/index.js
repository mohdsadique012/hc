// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Tailwind CSS setup
import { ProductProvider } from './context/ProductContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ProductProvider>
      <App />
    </ProductProvider>
  </React.StrictMode>
);
