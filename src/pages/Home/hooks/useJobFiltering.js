import { useState, useEffect } from "react";
import { useJob } from "../contexts/JobContext";

export const useJobFiltering = () => {
    const {
        jobs,
        query,
        locationQuery, // Now used for company search
        selectedCategory,
        currentPage,
        itemsPerPage,
    } = useJob();

    // Safe defaults for query and locationQuery
    const safeQuery = query ? query.toString() : "";
    const safeLocationQuery = locationQuery ? locationQuery.toString() : "";

    // Filter jobs based on job role (query) and company (locationQuery)
    const filteredItems = jobs.filter((job) => {
        // Safe property access with fallback empty string
        const jobTitle = job.jobTitle ? job.jobTitle.toString() : "";
        const jobCompanyName = job.companyName ? job.companyName.toString() : "";

        // Job role (query) should only match jobTitle
        const titleMatch =
            !safeQuery || // If no query, match all
            jobTitle.toLowerCase().includes(safeQuery.toLowerCase());

        // Company (locationQuery) should only match companyName
        const companyMatch =
            !safeLocationQuery || // If no company query, match all
            jobCompanyName.toLowerCase().includes(safeLocationQuery.toLowerCase());

        // If no search criteria, include all jobs
        if (!safeQuery && !safeLocationQuery) return true;

        // If only searching by job role, match title
        if (safeQuery && !safeLocationQuery) return titleMatch;

        // If only searching by company, match company
        if (!safeQuery && safeLocationQuery) return companyMatch;

        // If searching by both, match both criteria
        return titleMatch && companyMatch;
    });

    const calculatePageRange = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    };

    const filteredData = () => {
        let filteredJobs = jobs;

        // Apply search filters (job role and company)
        if (safeQuery || safeLocationQuery) {
            filteredJobs = filteredItems;
        }

        // Apply category filters if selectedCategory exists
        if (selectedCategory) {
            filteredJobs = filteredJobs.filter(
                ({
                    jobLocation,
                    salaryType,
                    experienceLevel,
                    maxPrice,
                    postingDate,
                    employmentType,
                    companyName,
                }) => {
                    const safeJobLocation = jobLocation ? jobLocation.toString() : "";
                    const safeSalaryType = salaryType ? salaryType.toString() : "";
                    const safeExperienceLevel = experienceLevel
                        ? experienceLevel.toString()
                        : "";
                    const safeEmploymentType = employmentType
                        ? employmentType.toString()
                        : "";
                    const safeCompanyName = companyName ? companyName.toString() : "";

                    return (
                        safeJobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
                        postingDate === selectedCategory ||
                        (maxPrice && parseInt(maxPrice) <= parseInt(selectedCategory)) ||
                        safeSalaryType.toLowerCase() === selectedCategory.toLowerCase() ||
                        safeExperienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
                        safeEmploymentType.toLowerCase() === selectedCategory.toLowerCase() ||
                        safeCompanyName.toLowerCase() === selectedCategory.toLowerCase()
                    );
                }
            );
        }

        const { startIndex, endIndex } = calculatePageRange();
        return filteredJobs.slice(startIndex, endIndex);
    };

    return {
        filteredItems,
        filteredData,
    };
};