import React, { useContext } from "react";
import { FiMapPin, FiBriefcase, FiMenu } from "react-icons/fi";
import { useJob } from "../contexts/JobContext";
import { useJobFiltering } from "../hooks/useJobFiltering";
import { ThemeContext } from "../../../context/themeContext"; // Import ThemeContext

const SearchBar = () => {
    const {
        query,
        setQuery,
        locationQuery,
        setLocationQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        isLoading
    } = useJob();
    const { filteredItems } = useJobFiltering();
    const { theme } = useContext(ThemeContext); // Access the current theme

    return (
        <div
            className={`backdrop-blur-sm border rounded-xl mx-1 py-4 px-2 lg:p-6 shadow-lg ${theme === "light"
                ? "bg-[#bbc4c2] border-gray-200"
                : "bg-gray-900/50 border-emerald-500/20"
                }`}
        >
            <div className="flex flex-row gap-1 items-center justify-evenly">
                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`p-2 rounded-lg sm:hidden transition-colors ${theme === "light"
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                >
                    <FiMenu
                        size={24}
                        className={theme === "light" ? "text-emerald-600" : "text-emerald-400"}
                    />
                </button>

                {/* Search Form */}
                <form className="flex flex-1 flex-row gap-1 lg:w-[70%]">
                    {/* Job Title Input */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                            <FiBriefcase
                                className={`w-5 h-5 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"
                                    }`}
                            />
                        </div>
                        <input
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm ${theme === "light"
                                ? "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-emerald-500"
                                : "bg-gray-800 border-emerald-500/20 text-gray-100 placeholder-gray-400 focus:border-emerald-500"
                                }`}
                            placeholder="Search job title..."
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FiMapPin
                                className={`w-5 h-5 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"
                                    }`}
                            />
                        </div>
                        <input
                            type="text"
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border focus:ring-2 focus:ring-emerald-500/50 transition-all text-sm ${theme === "light"
                                ? "bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-500 focus:border-emerald-500"
                                : "bg-gray-800 border-emerald-500/20 text-gray-100 placeholder-gray-400 focus:border-emerald-500"
                                }`}
                            placeholder="Location..."
                            onChange={(e) => setLocationQuery(e.target.value)}
                            value={locationQuery}
                        />
                    </div>
                </form>

                {/* Job Count */}
                <div
                    className={`text-sm font-medium whitespace-nowrap ${theme === "light" ? "text-emerald-600" : "text-emerald-400"
                        }`}
                >
                    {isLoading ? "Loading jobs..." : `${filteredItems.length} Jobs`}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;