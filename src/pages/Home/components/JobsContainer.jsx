import React, { useEffect, useRef, useCallback } from "react";
import Card from "../../../components/Card";
import { useJob } from "../contexts/JobContext";

const JobsContainer = () => {
    const { isLoading, jobs, fetchMoreJobs, hasMore } = useJob();
    const observer = useRef();
    
    // Reset scroll position when component mounts
    useEffect(() => window.scrollTo(0, 0), []);

    // This is the last element ref callback for intersection observer
    const lastJobElementRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                fetchMoreJobs();
            }
        }, { 
            root: null,
            rootMargin: '0px',
            threshold: 0.1  // Trigger when 10% of the element is visible
        });
        
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore, fetchMoreJobs]);

    // Initial loading state
    if (isLoading && jobs.length === 0) {
        return (
            <div className="flex-grow flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    // No jobs found state
    if (jobs.length === 0 && !isLoading) {
        return (
            <div className="flex-grow flex items-center justify-center px-4 ">
                <div className="max-w-md text-center p-8 bg-gray-900/50 backdrop-blur-sm border border-emerald-500/20 rounded-xl">
                    <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                        No Jobs Found
                    </h3>
                    <p className="text-gray-300">
                        We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-grow w-full overflow-y-auto px-4 ">
            <div className="py-6">
                {jobs.map((job, index) => {
                    // Apply the ref to the last element
                    if (jobs.length === index + 1) {
                        return <Card ref={lastJobElementRef} key={job._id || index} data={job} />;
                    } else {
                        return <Card key={job._id || index} data={job} />;
                    }
                })}
                
                {/* Loading indicator for more data */}
                {isLoading && (
                    <div className="flex justify-center py-6">
                        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    </div>
                )}
                
                {/* End of results message */}
                {!isLoading && !hasMore && jobs.length > 0 && (
                    <div className="text-center py-8 text-gray-400">
                        <p>You've reached the end of the results</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsContainer;