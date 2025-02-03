import React, { useContext } from "react";
import { JobProvider } from "../contexts/JobContext";
import { ThemeContext } from "../../../context/themeContext";
import SearchBar from "./SearchBar";
import SidebarContainer from "./SidebarContainer";
import JobsContainer from "./JobsContainer";
import Pagination from "./Pagination";
import NewsletterPopup from "./NewsletterPopup";
import "./Home.css";

const Home = () => {
  const { theme } = useContext(ThemeContext); // Access theme context

  return (
    <JobProvider>
      <div className={`min-h-screen transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-[#FAF9F6]" : "bg-[#FAF9F6] text-black"}`}>
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
      <NewsletterPopup />
    </JobProvider>
  );
};

export default Home;
