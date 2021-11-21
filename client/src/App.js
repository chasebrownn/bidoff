import React, { Fragment } from "react";
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
          <InputListing />
          <ListListings />
          <Register />
          {/* <Cards /> */}
        </div>
      </Fragment>
    </div>
  );
}

export default App;
