import React, { Fragment } from "react";
import './App.css';

//components
import InputListing from "./components/InputListing";
import ListListings from "./components/ListListings";

function App() {
  return (
    <div className="App">
      <Fragment>
        <div className="container">
          <ListListings />
        </div>
      </Fragment>
    </div>
  );
}

export default App;
