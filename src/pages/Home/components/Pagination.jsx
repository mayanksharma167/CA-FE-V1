import React from "react"; // Removed useEffect as it's causing a duplicate fetch
import { useJob } from "../contexts/JobContext";

const Pagination = () => {
    const { currentPage, setCurrentPage, totalPages, fetchJobs, query, locationQuery } = useJob();



    return (
        <div className="mb-1 p-2 flex justify-center items-center gap-4">
            
            <span className="text-sm text-emerald-400 font-medium">
                Page {currentPage} of {totalPages || 1}
            </span>
            
        </div>
    );
};

export default Pagination;