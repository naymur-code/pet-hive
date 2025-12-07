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
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
          to="/home"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : ""
          }
          to="/petssupplies"
        >
          Pets & Supplies
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : ""
              }
              to="/addlisting"
            >
              Add Listing
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : ""
              }
              to="/myorders"
            >
              My Orders
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      {" "}
      <div className="navbar container mx-auto px-5 py-3">
        {" "}
        <div className="navbar-start">
          {" "}
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
            Pet<span className="text-blue-400">Hive</span>{" "}
          </Link>{" "}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>
        <div className="navbar-end flex items-center gap-3">
          {user ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full overflow-hidden">
                  <img
                    src={
                      user.photoURL
                        ? user.photoURL
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <button onClick={handleLogOut} className="btn  btn-sm btn-error">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-info btn-sm">
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {isOpen && (
              <ul className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-white rounded-box absolute right-5 top-16 w-52">
                {navLinks}
                {user && (
                  <li>
                    <button onClick={handleLogOut}>Logout</button>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
