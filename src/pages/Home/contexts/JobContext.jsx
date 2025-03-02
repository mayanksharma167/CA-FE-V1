import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
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
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/all-jobs?page=${currentPage}&limit=${itemsPerPage}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();
                console.log("API Response:", data);  // Debugging line

                if (data.success && Array.isArray(data.data)) {
                    setJobs(data.data);

                    // Set pagination data from API response
                    if (data.pagination) {
                        setTotalPages(data.pagination.totalPages || 1);
                        setTotalJobs(data.pagination.totalJobs || 0);
                    } else {
                        setTotalPages(1);
                        setTotalJobs(0);
                    }
                } else {
                    setJobs([]);
                    setTotalPages(1);
                    setTotalJobs(0);
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                setJobs([]);
                setTotalPages(1);
                setTotalJobs(0);
            } finally {
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, [currentPage]);

    return (
        <JobContext.Provider
            value={{
                selectedCategory,
                setSelectedCategory,
                jobs,
                currentPage,
                setCurrentPage,
                totalPages,
                totalJobs,
                isLoading,
                query,
                setQuery,
                locationQuery,
                setLocationQuery,
                isSidebarOpen,
                setIsSidebarOpen,
                itemsPerPage,
            }}
        >
            {children}
        </JobContext.Provider>
    );
};