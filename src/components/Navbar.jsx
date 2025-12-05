import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => console.log("logout"))
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      <li>
        <NavLink to="/petssupplies">Pets & Supplies</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to="/addlisting">Add Listing</NavLink>
          </li>
          <li>
            <NavLink to="/myorders">My Orders</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar container mx-auto px-5 ">
        <div className="navbar-start">
          <div className="dropdown relative">
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            {/* Mobile menu */}
            {isOpen && (
              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow absolute">
                {navLinks}
              </ul>
            )}
          </div>

          <Link to="/" className="btn btn-ghost text-xl">
            Pet<span className="text-blue-400">Hive</span>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="space-x-3">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                  />
                </div>
              </div>
              <a className="btn" onClick={handleLogOut}>
                Logout
              </a>
            </div>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
