import React from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
    // Home | Pets & Supplies | Add Listing | Add Listing | My Orders
    const navLinks=<>
        <li><NavLink to='/home'>Home</NavLink></li>
        <li><NavLink>Pets & Supplies</NavLink></li>
        <li><NavLink>Add Listing</NavLink></li>
        <li><NavLink> My Orders</NavLink></li>

    </>
        
  return (
    <div className="bg-base-100 text-gray-600 shadow-sm">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
         {navLinks}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost text-xl">PetHive</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
