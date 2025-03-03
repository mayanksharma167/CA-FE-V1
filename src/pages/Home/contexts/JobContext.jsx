import React, { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isLoading, setIsLoading] = useState(false); // Changed initial state to false
    const [query, setQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [limit] = useState(10);
    
    // Define fetchJobs outside of the component to prevent recreation on each render
    const fetchJobs = async (page = 1, jobTitle = query, companyName = locationQuery) => {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        
        try {
            const url = new URL(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/all-jobs`);
            const params = {
                page,
                limit,
                ...(jobTitle && { jobtitle: jobTitle.trim() }),
                ...(companyName && { companyname: companyName.trim() }),
            };
            url.search = new URLSearchParams(params).toString();
            
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const data = await response.json();
            
            if (data.success) {
                setJobs(data.data);
                setCurrentPage(data.pagination.currentPage);
                setTotalPages(data.pagination.totalPages);
                setTotalJobs(data.pagination.totalJobs);
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
    
    // Use useEffect with an empty dependency array to fetch jobs only once on mount
    useEffect(() => {
        fetchJobs(currentPage, query, locationQuery);
    }, [currentPage, query, locationQuery]); // Added dependencies to prevent stale closure issues
    
    const value = {
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
        fetchJobs,
        limit,
    };
    
    return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};