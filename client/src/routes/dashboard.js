import React, { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

//components
import InputListing from "../components/InputListing";
import ListListings from "../components/ListListings";
import Cards from "../components/Cards";
import Register from "../components/Register";

function Dashboard() {
  return (
    <div className="App">
      <Fragment>
        <div className="container">
          <InputListing />
          <ListListings />
          {/* <Cards /> */}
        </div>
      </Fragment>
      <Outlet/>
    </div>
  );
}

export default Dashboard;
