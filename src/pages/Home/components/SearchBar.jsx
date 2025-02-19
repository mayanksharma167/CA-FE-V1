import React, { useContext, useState, useEffect } from "react";
import { FiMapPin, FiBriefcase, FiMenu } from "react-icons/fi";
import { useJob } from "../contexts/JobContext";
import { useJobFiltering } from "../hooks/useJobFiltering";
import { ThemeContext } from "../../../context/themeContext";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
    const {
        query,
        setQuery,
        locationQuery,
        setLocationQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        isLoading,
    } = useJob();
    const { filteredItems } = useJobFiltering();
    const { theme } = useContext(ThemeContext);

    // State for dynamic placeholders
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const placeholders = [
        "Job Role",
        "Comapny Name",
        "Microsoft",
        "Software Engineer",
    ];

    // Effect to cycle through placeholders every 3 seconds with cleanup
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPlaceholderIndex((prev) =>
                prev === placeholders.length - 1 ? 0 : prev + 1
            );
        }, 2000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [placeholders.length]);

    return (
        <div
            className={`backdrop-blur-sm border rounded-xl mx-1 py-4 px-2 lg:p-6 shadow-lg ${theme === "light"
                ? "bg-[#bbc4c2] border-gray-200"
                : "bg-gray-900/50 border-emerald-500/20"
                }`}
        >
            <div className="flex flex-row gap-1 items-center justify-between">
                {/* Sidebar Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className={`p-2 rounded-lg sm:hidden transition-colors ${theme === "light"
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-gray-800 hover:bg-gray-700"
                        }`}
                    aria-label="Toggle sidebar"
                >
                    <FiMenu
                        size={24}
                        className={
                            theme === "light" ? "text-emerald-600" : "text-emerald-400"
                        }
                    />
                </button>

                {/* Search Form */}
                <form className="flex-1 flex flex-row gap-2 lg:w-[70%]">
                    {/* Job Title and Company Search Input */}
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-3 z-20 flex items-center pointer-events-none">
                            <FiBriefcase
                                className={`w-5 h-5 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"
                                    }`}
                            />
                        </div>
                        <div className="relative w-full">
                            <input
                                type="text"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm outline-none ${theme === "light"
                                    ? "bg-white border-gray-300 text-gray-900 placeholder-transparent"
                                    : "bg-gray-800 border-gray-700 text-gray-100 placeholder-transparent"
                                    }`}
                                placeholder=""
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                                aria-label="Search job title or company"
                            />
                            <AnimatePresence mode="wait">
                                {!query && (
                                    <motion.span
                                        key={currentPlaceholderIndex}
                                        className={`absolute left-10 top-1/3 pointer-events-none text-sm ${theme === "light"
                                            ? "text-gray-500"
                                            : "text-gray-400"
                                            }`}
                                        initial={{ opacity: 0, y: 10 }} // Start slightly below
                                        animate={{ opacity: 1, y: -2 }} // Slightly above center
                                        exit={{ opacity: 0, y: -12 }} // Slide up less when exiting
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                        }}
                                        style={{
                                            transform: "translateY(-50%)",
                                            position: "absolute",
                                        }}
                                    >
                                        {placeholders[currentPlaceholderIndex]}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
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
                            className={`w-full pl-10 pr-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-sm outline-none ${theme === "light"
                                ? "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                : "bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400"
                                }`}
                            placeholder="Location..."
                            onChange={(e) => setLocationQuery(e.target.value)}
                            value={locationQuery}
                            aria-label="Search location"
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