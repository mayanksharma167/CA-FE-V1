
import React, { useContext } from "react";
import { FiX } from "react-icons/fi";
import { useJob } from "../contexts/JobContext";
import Sidebar from "../../../Sidebar/Sidebar";
import { ThemeContext } from "../../../context/themeContext";

const SidebarContainer = () => {
    const { isSidebarOpen, setIsSidebarOpen, setSelectedCategory } = useJob();
    const { theme } = useContext(ThemeContext);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div
            className={`fixed sm:top-0 md:top-5 lg:top-2 left-0 h-full w-64 sm:w-1/4 backdrop-blur-sm shadow-xl z-40 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } sm:relative sm:translate-x-0 ${theme === "light"
                    ? "bg-[#bbc4c2]/50 border-gray-200 text-gray-800"
                    : "bg-gray-900/50 border-emerald-500/20 text-gray-100"
                }`}
        >
            {/* Header Section for Close Button */}
            <div
                className={`relative pt-14 p-4 flex justify-end items-center border-b ${theme === "light"
                        ? "border-gray-300 bg-[#bbc4c2]/80"
                        : "border-gray-700 bg-gray-900/80"
                    } sm:hidden`}
            >
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
                >
                    <FiX size={24} />
                </button>
            </div>

            {/* Sidebar Content */}
            <Sidebar
                handleChange={handleChange}
                handleClick={handleClick}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    );
};

export default SidebarContainer;