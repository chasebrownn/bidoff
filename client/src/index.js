import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";


// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <App />
//     </Router>  
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./routes/dashboard";
import Login from "./components/Login";

const rootElement = document.getElementById("root");

function setToken(token){
    console.log("got token in index: " + token)
    localStorage.setItem('auth_token',token)
}

render(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<Login setToken={setToken} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="register" element={<App />} />
        </Routes>
    </BrowserRouter>,
  rootElement
);