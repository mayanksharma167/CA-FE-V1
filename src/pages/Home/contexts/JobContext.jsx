import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const itemsPerPage = 15;

    useEffect(() => {
        const fetchJobs = async () => {
            setIsLoading(true);
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/all-jobs`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (data.success && Array.isArray(data.data)) {
                    setJobs(data.data);
                } else {
                    setJobs([]);
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const value = {
        selectedCategory,
        setSelectedCategory,
        jobs,
        currentPage,
        setCurrentPage,
        isLoading,
        query,
        setQuery,
        locationQuery,
        setLocationQuery,
        isSidebarOpen,
        setIsSidebarOpen,
        itemsPerPage,
    };

    return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};