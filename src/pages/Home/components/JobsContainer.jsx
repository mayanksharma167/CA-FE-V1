import React, { useEffect } from "react";
import Card from "../../../components/Card";
import Jobs from "../../Jobs";
import { useJob } from "../contexts/JobContext";

const JobsContainer = () => {
    useEffect(() => window.scrollTo(0, 0), []);
    const { isLoading, jobs } = useJob();

    const result = jobs.map((data, i) => <Card key={data._id || i} data={data} />);

    if (isLoading) {
        return (
            <div className="flex-grow flex justify-center items-center">
                <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (result.length === 0) {
        return (
            <div className="flex-grow flex items-center justify-center px-4">
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
        <div className="flex-grow w-full overflow-y-auto px-4">
            <div className="space-y-8 py-6">
                <Jobs result={result} />
            </div>
        </div>
    );
};

export default JobsContainer;