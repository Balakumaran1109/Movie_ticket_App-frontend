import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import axios from 'axios'
import { Provider } from "react-redux"
import { store } from './store/Index.jsx'
axios.defaults.baseURL = "https://movie-ticket-app.onrender.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}> <App /></Provider>
   
    </BrowserRouter>
  </React.StrictMode>,
)
