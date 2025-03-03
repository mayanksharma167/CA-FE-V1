import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const JobContext = createContext();

export const useJob = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [locationQuery, setLocationQuery] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [limit] = useState(10);
    
    // Function to fetch jobs with query parameters
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
                // Reset jobs array when performing a new search
                setJobs(data.data);
                setCurrentPage(data.pagination.currentPage);
                setTotalPages(data.pagination.totalPages);
                setTotalJobs(data.pagination.totalJobs);
                setHasMore(data.pagination.currentPage < data.pagination.totalPages);
            } else {
                setJobs([]);
                setHasMore(false);
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Function to fetch more jobs for infinite scrolling
    const fetchMoreJobs = useCallback(async () => {
        if (isLoading || currentPage >= totalPages) return;
        
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const nextPage = currentPage + 1;
        
        try {
            const url = new URL(`${import.meta.env.VITE_BACKEND_URI}/api/v1/jobs/all-jobs`);
            const params = {
                page: nextPage,
                limit,
                ...(query && { jobtitle: query.trim() }),
                ...(locationQuery && { companyname: locationQuery.trim() }),
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
                // Append new jobs to existing jobs array
                setJobs(prevJobs => [...prevJobs, ...data.data]);
                setCurrentPage(nextPage);
                setHasMore(nextPage < data.pagination.totalPages);
            } else {
                setHasMore(false);
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching more jobs:", error);
            setHasMore(false);
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, isLoading, limit, locationQuery, query, totalPages]);
    
    // Reset and fetch initial jobs when search parameters change
    useEffect(() => {
        setCurrentPage(1);
        setJobs([]);
        fetchJobs(1, query, locationQuery);
    }, [query, locationQuery]);
    
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
        fetchMoreJobs,
        hasMore,
        limit,
    };
    
    return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
};