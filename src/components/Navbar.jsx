import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";

import { BsStars } from "react-icons/bs";
import { AuthContext } from "../context/AuthProvider";
import './Banner.css';
import { useNavigate } from "react-router-dom";
import { reload } from "firebase/auth";
import { ThemeContext } from "../context/themeContext";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  // Check local storage for token and user on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    logOut()
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        navigate('/');


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
    { path: "/careers", title: "Careers" }
  ];

  const authNavItems = [
    { path: "/login", title: "Login" },
    { path: "/signup", title: "Sign Up" }
  ];

  return (
    <header className="max-w-screen mx-auto xl:px-24 px-4 fixed top-0 left-0 right-0 bg-slate-950 z-50">
      <nav className="flex items-center py-1.5 navbar">
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <a className="flex items-center gap-2 text-2xl text-black" href="/">
            <img src="./CA.png" alt="logo" height={12} width={140} />
            <span className="powered-by">by- Coding Arrow</span>
          </a>
        </div>

        {/* Main Navigation - Center */}
        <ul className="hidden md:flex items-center gap-10 mx-auto ml-48 md:ml-32">
          {mainNavItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth Navigation - Right */}
        <ul className="hidden md:flex items-center gap-10">
          <li className="flex relative justify-center right-20 items-center ml-60">
            <NavLink
              to="/resume"
              className="flex items-center gap-2 text-white px-3 py-2 border-2 border-emerald-700 rounded-xl hover:bg-emerald-600 hover:text-white transition duration-200"
            >
              AI Resume
              <BsStars />
            </NavLink>

          </li>
          <li><button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${theme === "light" ? "bg-gray-200 hover:bg-gray-300 text-black " : "bg-emerald-800 hover:bg-emerald-700"
              } transition-colors duration-300`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button></li>
          {isLoggedIn ? (
            <>
              <li>
                <img
                  src={user?.image || user?.user?.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-4"
                />
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white px-3 py-2 border-2 border-red-700 rounded-xl hover:bg-red-600 transition duration-200"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            authNavItems.map(({ path, title }) => (
              <li key={path} className="text-base text-white">
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden m-auto">
          <button
            onClick={toggleTheme}
            className={` p-2 rounded-full ${theme === "light" ? "bg-gray-200 hover:bg-gray-300 text-black " : "bg-emerald-800 hover:bg-emerald-700"
              } transition-colors duration-300`}
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
        <div className="md:hidden ml-auto gap-5">

          <button onClick={handleMenuToggler} className="p-2">
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-white" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-white/75" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul className="space-y-2">
          {mainNavItems.map(({ path, title }) => (
            <li>

            </li>,
            <li key={path} className="text-base text-white">
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          {/* AI Resume for Mobile */}
          <li>
            <NavLink
              to="/resume"
              onClick={handleMenuToggler}
              className="flex items-center gap-2 text-white"
            >
              AI Resume
            </NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-white"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            authNavItems.map(({ path, title }) => (
              <li key={path} className="text-base text-white">
                <NavLink
                  onClick={handleMenuToggler}
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))
          )}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;