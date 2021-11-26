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

import Dashboard from "./dashboard";

const rootElement = document.getElementById("root");

render(
    <BrowserRouter>
        <Routes>
            <Route path="" element={<App />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>,
  rootElement
);