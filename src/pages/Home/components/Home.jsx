import React from "react";
import { JobProvider } from "../contexts/JobContext"
import SearchBar from "./SearchBar";
import SidebarContainer from "./SidebarContainer";
import JobsContainer from "./JobsContainer";
import Pagination from "./Pagination";
import './Home.css';
const Home = () => {
    return (
        <JobProvider>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="flex flex-col h-screen pt-4 lg:pt-6">
                    <div className="flex-grow flex overflow-hidden">
                        <SidebarContainer />
                        <div className="flex-1 pt-11 sm:pt-14 md:pt-8 lg:pt-9 flex flex-col">
                            <SearchBar />
                            <JobsContainer />
                            <Pagination />
                        </div>
                    </div>
                </div>
            </div>
        </JobProvider>
    );
};

export default Home;