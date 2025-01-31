import React from "react";
import { useJob } from "../contexts/JobContext";
import { useJobFiltering } from "../hooks/useJobFiltering";

const Pagination = () => {
    const { currentPage, setCurrentPage, itemsPerPage } = useJob();
    const { filteredItems } = useJobFiltering();

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="mb-1 p-2 flex justify-center items-center gap-4">
            <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-emerald-400 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-emerald-500/20"
            >
                Previous
            </button>
            <span className="text-sm text-emerald-400 font-medium">
                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
            </span>
            <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)}
                className="px-4 py-2 text-sm font-medium text-emerald-400 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-emerald-500/20"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;