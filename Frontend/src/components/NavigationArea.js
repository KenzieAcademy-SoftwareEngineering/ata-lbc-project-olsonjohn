import React from "react";
import {NavLink} from "react-router-dom"

function NavigationArea() {
  return (
    <>
            <NavLink to="/">Ticket Tracker</NavLink>
          <NavLink to="/create/user">Add Customer</NavLink>
          <button color="inherit">Login</button>
    </>
  );
}

export default NavigationArea;