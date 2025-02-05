import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { IoIosPaper } from "react-icons/io";
import { CiSettings, CiLogout } from "react-icons/ci";
import { IoHelpCircleOutline } from "react-icons/io5";

import { Sun, Moon } from "lucide-react";
import { BsStars } from "react-icons/bs";
import { AuthContext } from "../context/AuthProvider";
import "./Banner.css";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        setUser(null);
        setShowDropdown(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const mainNavItems = [
    { path: "/", title: "Home" },
    { path: "/jobs", title: "Jobs" },
    { path: "/about", title: "About" },
    { path: "/careers", title: "Careers" },
  ];

  const authNavItems = [
    { path: "/login", title: "Login" },
    { path: "/signup", title: "Sign Up" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        theme === "light" ? "bg-slate-950" : "bg-slate-950"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <img src="./CA.png" alt="logo" className="h-8 w-auto" />
              <span
                className={`text-sm font-medium ${
                  theme === "light" ? "text-gray-200" : "text-gray-200"
                }`}
              ></span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {mainNavItems.map(({ path, title }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "text-emerald-500"
                      : theme === "light"
                      ? "text-gray-200 hover:text-emerald-400"
                      : "text-gray-200 hover:text-emerald-400"
                  }`
                }
              >
                {title}
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 sm:md:lg:xl:space-x-8">
            {/* AI Resume Button */}
            <NavLink
              to="/resume"
              className="hidden lg:flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors duration-150"
            >
              <span>AI Resume</span>
              <BsStars className="h-4 w-4" />
            </NavLink>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-150 ${
                theme === "light"
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-slate-800 hover:bg-slate-700 text-gray-200"
              }`}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>

            {/* User Profile/Auth */}
            {isLoggedIn ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={
                      user?.image || user?.user?.image || "/default-avatar.png"
                    }
                    alt="Profile"
                    className="h-8 w-8 rounded-full ring-2 ring-emerald-500"
                  />
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ${
                      theme === "light"
                        ? "bg-white ring-1 ring-black ring-opacity-5"
                        : "bg-slate-800"
                    }`}
                  >
                    <NavLink
                      to="/edit-resume"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        theme === "light"
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-200 hover:bg-slate-700"
                      }`}
                    >
                      <IoIosPaper /> Edit Resume
                    </NavLink>
                    <NavLink
                      to="/account-settings"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        theme === "light"
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-200 hover:bg-slate-700"
                      }`}
                    >
                      <CiSettings className="text-xl" /> Account Settings
                    </NavLink>
                    <NavLink
                      to="/suggestions"
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        theme === "light"
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-gray-200 hover:bg-slate-700"
                      }`}
                    >
                      <IoHelpCircleOutline className="text-xl" />
                      Suggestions / Help
                    </NavLink>
                    <div
                      className={`flex flex-col border-t ${
                        theme === "light"
                          ? "border-gray-100"
                          : "border-slate-600"
                      }`}
                    >
                      <button
                        onClick={handleLogout}
                        className={`flex items-center gap-2 px-4 py-2 text-sm w-full text-left ${
                          theme === "light"
                            ? "text-gray-700 hover:bg-gray-100"
                            : "text-gray-200 hover:bg-slate-700"
                        }`}
                      >
                        <CiLogout className="w-5 h-5" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-4">
                {authNavItems.map(({ path, title }) => (
                  <NavLink
                    key={path}
                    to={path}
                    className={({ isActive }) =>
                      `text-sm font-medium ${
                        isActive
                          ? "text-emerald-500"
                          : theme === "light"
                          ? "text-gray-700 hover:text-emerald-500"
                          : "text-gray-200 hover:text-emerald-400"
                      }`
                    }
                  >
                    {title}
                  </NavLink>
                ))}
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={handleMenuToggler}
              className="lg:hidden p-2 rounded-md focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark
                  className={`h-6 w-6 ${
                    theme === "light" ?"text-gray-200" : "text-gray-200"
                  }`}
                />
              ) : (
                <FaBarsStaggered
                  className={`h-6 w-6 ${
                    theme === "light" ? "text-gray-200" : "text-gray-200"
                  }`}
                />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-2">
            <div
              className={`px-2 pt-2 pb-3 space-y-1 ${
                theme === "light" ? "bg-slate-950" : "bg-slate-950"
              }`}
            >
              {mainNavItems.map(({ path, title }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={handleMenuToggler}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? "text-emerald-500"
                        : theme === "light"
                        ? "text-gray-200 hover:text-emerald-400"
                        : "text-gray-200 hover:text-emerald-400"
                    }`
                  }
                >
                  {title}
                </NavLink>
              ))}
              <NavLink
                to="/resume"
                onClick={handleMenuToggler}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  theme === "light"
                    ? "text-gray-200 hover:text-emerald-400"
                    : "text-gray-200 hover:text-emerald-400"
                }`}
              >
                AI Resume
              </NavLink>
              {!isLoggedIn && (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  {authNavItems.map(({ path, title }) => (
                    <NavLink
                      key={path}
                      to={path}
                      onClick={handleMenuToggler}
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md text-base font-medium ${
                          isActive
                            ? "text-emerald-500"
                            : theme === "light"
                            ? "text-gray-200 hover:text-emerald-400"
                            : "text-gray-200 hover:text-emerald-400"
                        }`
                      }
                    >
                      {title}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
