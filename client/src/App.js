import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import './App.css';

//components
import InputListing from "./components/InputListing";
import ListListings from "./components/ListListings";
import Cards from "./components/Cards";
import Register from "./components/Register";



function App() {
  return (
    <div className="App">
      <Fragment>
        <div className="container">
          {/* <InputListing />
          <ListListings /> */}
          <Register />
          {/* <Cards /> */}
          
        </div>
      </Fragment>
      <Outlet />
    </div>
  );
}

export default App;
