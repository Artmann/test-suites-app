/* eslint-env browser */
// eslint-disable-file react/jsx-filename-extension
import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
