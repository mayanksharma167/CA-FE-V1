import React, { useContext, useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { useJob } from "../contexts/JobContext";
import Sidebar from "../../../Sidebar/Sidebar";
import { ThemeContext } from "../../../context/themeContext";

const SidebarContainer = () => {
    const { isSidebarOpen, setIsSidebarOpen, setSelectedCategory } = useJob();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div
            className={`fixed sm:top-0 md:top-5 lg:top-2 left-0 h-full ${theme === "light" ? "bg-gray-50 text-gray-800" : "bg-slate-950 text-creamWhite"
                } shadow-xl z-20 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:relative sm:translate-x-0 sm:w-1/4`}
        >
            <div className="relative p-4 pt-20 flex justify-end items-end sm:hidden">
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                    <FiX size={24} />
                </button>
            </div>
            <Sidebar
                handleChange={handleChange}
                handleClick={handleClick}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    );
};

export default SidebarContainer;
