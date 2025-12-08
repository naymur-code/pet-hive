import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(AuthContext);

  // Theme state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Apply theme on load or change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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
              to="/my-listing"
            >
              My Listing
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
    <div className=" shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto px-5 py-3">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold">
            Pet<span className="text-blue-400">Hive</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>

        <div className="navbar-end flex items-center gap-3">

          {/* Theme toggle */}
          <label className="toggle text-base-content cursor-pointer">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
            />

            {/* Sun icon */}
            <svg
              aria-label="sun"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </g>
            </svg>

            {/* Moon icon */}
            <svg
              aria-label="moon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </g>
            </svg>
          </label>

          {/* User logged in */}
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

              <button onClick={handleLogOut} className="btn btn-sm btn-error">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-info btn-sm">
              Login
            </Link>
          )}

          {/* Mobile Menu */}
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
