import React, { useContext, useState, useEffect, useMemo } from "react";
import { FiMapPin, FiBriefcase, FiMenu, FiSearch, FiChevronDown, FiChevronUp, FiFilter } from "react-icons/fi";
import { useJob } from "../contexts/JobContext";
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
        jobs,
        fetchJobs,
        currentPage,
        totalJobs = 0, // Add totalJobs with default value
    } = useJob();
    const { theme } = useContext(ThemeContext);

    const [searchQuery, setSearchQuery] = useState(query);
    const [companyQuery, setCompanyQuery] = useState(locationQuery);
    const [titleSuggestions, setTitleSuggestions] = useState([]);
    const [companySuggestions, setCompanySuggestions] = useState([]);
    const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
    const [showCompanySuggestions, setShowCompanySuggestions] = useState(false);
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [currentCompanyPlaceholderIndex, setCurrentCompanyPlaceholderIndex] = useState(0);
    const [isCollapsed, setIsCollapsed] = useState(() => window.innerWidth < 640);

    const placeholders = ["Job role", "Analyst", "Software", "Developer", "Systems Engineer", "Data Scientist", "Product Manager"];
    const companyPlaceholders = ["Company name", "Microsoft", "Google", "NVIDIA", "Amazon", "Apple", "BCG", "McKinsey", "Bain", "Deloitte", "Accenture", "PwC", "EY", "KPMG"];

    const { availableTitles, availableCompanies } = useMemo(() => {
        const titlesSet = new Set();
        const companiesSet = new Set();

        jobs.forEach((job) => {
            const title = job.jobTitle ? job.jobTitle.toString() : "";
            const company = job.companyName ? job.companyName.toString() : "";

            if (title) titlesSet.add(title);
            if (company) companiesSet.add(company);
        });

        return {
            availableTitles: Array.from(titlesSet),
            availableCompanies: Array.from(companiesSet),
        };
    }, [jobs]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentPlaceholderIndex((prev) => (prev === placeholders.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [placeholders.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentCompanyPlaceholderIndex((prev) => (prev === companyPlaceholders.length - 1 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(timer);
    }, [companyPlaceholders.length]);

    const handleTitleQueryChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);

        if (value.length > 0) {
            const filteredSuggestions = availableTitles
                .filter((title) => title.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 5);
            setTitleSuggestions(filteredSuggestions);
            setShowTitleSuggestions(true);
        } else {
            setTitleSuggestions([]);
            setShowTitleSuggestions(false);
        }
    };

    const handleCompanyQueryChange = (e) => {
        const value = e.target.value;
        setCompanyQuery(value);

        if (value.length > 0) {
            const filteredSuggestions = availableCompanies
                .filter((company) => company.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 5);
            setCompanySuggestions(filteredSuggestions);
            setShowCompanySuggestions(true);
        } else {
            setCompanySuggestions([]);
            setShowCompanySuggestions(false);
        }
    };

    const handleTitleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        setShowTitleSuggestions(false);
    };

    const handleCompanySuggestionClick = (suggestion) => {
        setCompanyQuery(suggestion);
        setShowCompanySuggestions(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmedSearchQuery = searchQuery.trim();
        const trimmedCompanyQuery = companyQuery.trim();
        setQuery(trimmedSearchQuery);
        setLocationQuery(trimmedCompanyQuery);
        fetchJobs(1, trimmedSearchQuery, trimmedCompanyQuery);
        setShowTitleSuggestions(false);
        setShowCompanySuggestions(false);
        setIsCollapsed(true);
    };

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <motion.div
            initial={{ height: "auto" }}
            animate={{ height: isCollapsed ? "auto" : "auto" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`backdrop-blur-sm border rounded-xl mx-2 sm:mx-2 md:mx-4 py-2 sm:py-4 px-2 sm:px-4 md:px-6 shadow-lg relative z-30 transition-all duration-300 ${
                theme === "light" ? "bg-[#bbc4c2] border-gray-200" : "bg-gray-900/50 border-emerald-500/20"
            }`}
        >
            <div className="flex flex-row items-center justify-between w-full space-x-2 sm:space-x-4 md:space-x-6">
                <AnimatePresence>
                    {isCollapsed ? (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 flex items-center justify-between w-full"
                        >
                            <div className="flex items-center gap-2">
                                <span className={`text-sm font-medium ${theme === "light" ? "text-gray-800" : "text-gray-200"}`}>
                                    {searchQuery || companyQuery
                                        ? `${searchQuery || "Any role"} at ${companyQuery || "Any company"}`
                                        : "No search criteria"}
                                </span>
                                <button onClick={toggleCollapse} className="p-1 rounded-full hover:bg-gray-700/50 transition-colors">
                                    <FiChevronDown size={16} className={theme === "light" ? "text-emerald-600" : "text-emerald-400"} />
                                </button>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-1.5 rounded-lg transition-colors hidden xs:flex"
                                    aria-label="Toggle filters"
                                >
                                    <FiFilter size={16} className={theme === "light" ? "text-emerald-600" : "text-emerald-400"} />
                                </button>
                                <div className={`text-xs sm:text-sm font-medium whitespace-nowrap ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`}>
                                    {isLoading ? "Loading..." : `${totalJobs} Total Jobs`}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 w-full"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-2 sm:gap-3 w-full">
                                <div className="w-full flex flex-col lg:flex-row gap-2 sm:gap-3">
                                    <div className="relative flex-1 w-full min-w-0">
                                        <div className="absolute inset-y-0 left-3 flex items-center">
                                            <FiBriefcase className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`} />
                                        </div>
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-1.5 sm:py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 text-xs sm:text-sm outline-none truncate ${
                                                    theme === "light"
                                                        ? "bg-white border-gray-300 text-gray-900 placeholder-transparent"
                                                        : "bg-gray-800 border-gray-700 text-gray-100 placeholder-transparent"
                                                }`}
                                                placeholder=""
                                                onChange={handleTitleQueryChange}
                                                value={searchQuery}
                                                onBlur={() => setTimeout(() => setShowTitleSuggestions(false), 200)}
                                                onFocus={() => searchQuery && setShowTitleSuggestions(true)}
                                                aria-label="Search job title"
                                            />
                                            <AnimatePresence mode="wait">
                                                {!searchQuery && (
                                                    <motion.span
                                                        key={currentPlaceholderIndex}
                                                        className={`absolute left-10 top-1/3 pointer-events-none text-xs sm:text-sm truncate ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: -2 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        style={{ transform: "translateY(-50%)", position: "absolute", maxWidth: "calc(100% - 40px)" }}
                                                    >
                                                        {placeholders[currentPlaceholderIndex]}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                            <AnimatePresence>
                                                {showTitleSuggestions && titleSuggestions.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg border ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}`}
                                                    >
                                                        {titleSuggestions.map((suggestion, index) => (
                                                            <div
                                                                key={index}
                                                                onMouseDown={() => handleTitleSuggestionClick(suggestion)}
                                                                className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${theme === "light" ? "hover:bg-gray-100 text-gray-900" : "hover:bg-gray-700 text-gray-100"}`}
                                                            >
                                                                {suggestion}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    <div className="relative flex-1 w-full min-w-0">
                                        <div className="absolute inset-y-0 left-3 flex items-center">
                                            <FiBriefcase className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`} />
                                        </div>
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                className={`w-full pl-10 pr-4 py-1.5 sm:py-2 rounded-lg border focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 text-xs sm:text-sm outline-none truncate ${
                                                    theme === "light"
                                                        ? "bg-white border-gray-300 text-gray-900 placeholder-transparent"
                                                        : "bg-gray-800 border-gray-700 text-gray-100 placeholder-transparent"
                                                }`}
                                                placeholder=""
                                                onChange={handleCompanyQueryChange}
                                                value={companyQuery}
                                                onBlur={() => setTimeout(() => setShowCompanySuggestions(false), 200)}
                                                onFocus={() => companyQuery && setShowCompanySuggestions(true)}
                                                aria-label="Search company"
                                            />
                                            <AnimatePresence mode="wait">
                                                {!companyQuery && (
                                                    <motion.span
                                                        key={currentCompanyPlaceholderIndex}
                                                        className={`absolute left-10 top-1/3 pointer-events-none text-xs sm:text-sm truncate ${theme === "light" ? "text-gray-500" : "text-gray-400"}`}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: -2 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                                        style={{ transform: "translateY(-50%)", position: "absolute", maxWidth: "calc(100% - 40px)" }}
                                                    >
                                                        {companyPlaceholders[currentCompanyPlaceholderIndex]}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                            <AnimatePresence>
                                                {showCompanySuggestions && companySuggestions.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className={`absolute z-50 w-full mt-1 rounded-lg shadow-lg border ${theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"}`}
                                                    >
                                                        {companySuggestions.map((suggestion, index) => (
                                                            <div
                                                                key={index}
                                                                onMouseDown={() => handleCompanySuggestionClick(suggestion)}
                                                                className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${theme === "light" ? "hover:bg-gray-100 text-gray-900" : "hover:bg-gray-700 text-gray-100"}`}
                                                            >
                                                                {suggestion}
                                                            </div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex w-full lg:w-auto gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center lg:hidden ${
                                            theme === "light" ? "bg-white hover:bg-gray-100 text-emerald-600 border border-gray-300" : "bg-gray-800 hover:bg-gray-700 text-emerald-400 border border-gray-700"
                                        }`}
                                        aria-label="Toggle filters"
                                    >
                                        <FiFilter size={16} />
                                    </button>
                                    <button
                                        type="submit"
                                        className={`p-2 sm:p-2.5 rounded-lg transition-all duration-300 flex items-center gap-1 w-full justify-center ${
                                            theme === "light" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-emerald-500 hover:bg-emerald-600 text-white"
                                        }`}
                                        aria-label="Search jobs"
                                    >
                                        <FiSearch size={16} className="sm:size-20" />
                                        <span className="text-xs sm:text-sm">Search</span>
                                    </button>
                                </div>
                                <div className={`text-xs text-center mt-2 sm:text-sm font-medium ${theme === "light" ? "text-emerald-600" : "text-emerald-400"}`}>
                                    {`${totalJobs}  Jobs`}
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SearchBar;