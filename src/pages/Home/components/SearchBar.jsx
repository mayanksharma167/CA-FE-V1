import React from "react";
import { FiMapPin, FiBriefcase, FiMenu } from "react-icons/fi";
import { useJob } from "../contexts/JobContext";
import { useJobFiltering } from "../hooks/useJobFiltering";

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

    return (
        <div className="bg-gray-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl mx-1 py-4 px-2 lg:p-6 shadow-lg">
            <div className="flex flex-row gap-1 items-center justify-evenly">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg sm:hidden transition-colors"
                >
                    <FiMenu size={24} className="text-emerald-400" />
                </button>

                <form className="flex flex-1 flex-row gap-1 lg:w-[70%]">
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                            <FiBriefcase className="w-5 h-5 text-emerald-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-emerald-500/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all text-gray-100 placeholder-gray-400 text-sm"
                            placeholder="Search job title..."
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                        />
                    </div>
                    <div className="flex-1 relative">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <FiMapPin className="w-5 h-5 text-emerald-400" />
                        </div>
                        <input
                            type="text"
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-emerald-500/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 transition-all text-gray-100 placeholder-gray-400 text-sm"
                            placeholder="Location..."
                            onChange={(e) => setLocationQuery(e.target.value)}
                            value={locationQuery}
                        />
                    </div>
                </form>

                <div className="text-emerald-400 text-sm font-medium whitespace-nowrap">
                    {isLoading ? "Loading jobs..." : `${filteredItems.length} Jobs`}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;