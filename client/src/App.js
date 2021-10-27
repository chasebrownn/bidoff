import React, { Fragment } from "react";
import './App.css';

//components
import InputListing from "./components/InputListing";
import ListListings from "./components/ListListings";
import Cards from "./components/Cards";

function App() {
  return (
    <div className="App">
      <Fragment>
        <div className="container">
          <ListListings />
          {/* <Cards /> */}
        </div>
      </Fragment>
    </div>
  );
}

export default App;
