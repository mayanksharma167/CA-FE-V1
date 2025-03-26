import React, { useContext, useState } from "react"; 
import { FiX } from "react-icons/fi"; 
import { useJob } from "../contexts/JobContext"; 
import Sidebar from "../../../Sidebar/Sidebar"; 
import { ThemeContext } from "../../../context/themeContext"; 
import { Player } from "@lottiefiles/react-lottie-player"; 
import { InformationCard, MessageCard } from "./info"; 

const SidebarContainer = () => {
    const { isSidebarOpen, setIsSidebarOpen, setSelectedCategory } = useJob();
    const { theme } = useContext(ThemeContext);
    
    // State to track dropdown open status
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    // Modified Sidebar component to pass dropdown state
    const EnhancedSidebar = (props) => {
        return (
            <Sidebar 
                {...props}
                onDropdownToggle={(isOpen) => setIsDropdownOpen(isOpen)}
            />
        );
    };

    return (
        <div
            className={`fixed sm:top-0 md:top-5 lg:top-2 left-0 h-full w-64 sm:w-1/4 backdrop-blur-sm shadow-xl z-40 transition-transform transform ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:relative sm:translate-x-0 ${
                theme === "light"
                    ? "bg-[#bbc4c2]/50 border-gray-200 text-gray-800"
                    : "bg-gray-900/50 border-emerald-500/20 text-gray-100"
            }`}
        >
            {/* Header Section for Close Button */}
            <div
                className={`relative pt-14 p-4 flex justify-end items-center border-b ${
                    theme === "light"
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
            <EnhancedSidebar
                handleChange={handleChange}
                handleClick={handleClick}
                setIsSidebarOpen={setIsSidebarOpen}
            />

            

            {/* Lottie Animation at Bottom */}
            <div className="absolute bottom-2 right-4 transform -translate-x-1/2 w-40">
                <Player
                    autoplay
                    loop
                    src={"/up.json"}
                    style={{ height: "35vh"}}
                    
                />
            </div>
        </div>
    );
};

export default SidebarContainer;