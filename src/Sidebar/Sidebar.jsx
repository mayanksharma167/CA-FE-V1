import React, { useState, useContext } from "react";
import { ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/themeContext";

const Sidebar = ({ handleChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({
    location: "Location",
    salaryType: "Any",
    salaryRange: "Any",
    experience: "Any experience",
    employmentType: "Employment Type",
    jobPostingDate: "Date of Posting",
  });

  // Keeping the same options object
  const options = {
    location: [
      { value: "", label: "All" },
      { value: "gurgaon", label: "Gurgaon" },
      { value: "bengaluru", label: "Bengaluru" },
      { value: "hyderabad", label: "Hyderabad" },
      { value: "mumbai", label: "Mumbai" },
    ],
    experience: [
      { value: "", label: "Any experience" },
      { value: "Internship", label: "Internship" },
      { value: "remote", label: "Work remotely" },
    ],
    employmentType: [
      { value: "", label: "Any" },
      { value: "full-time", label: "Full-time" },
      { value: "part-time", label: "Part-time" },
      { value: "freelance", label: "Freelance" },
      { value: "contract", label: "Contract" },
    ],
    jobPostingDate: [
      { value: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10), label: "Last 24 hours" },
      { value: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), label: "Last 7 days" },
      { value: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10), label: "Last Month" },
    ],
  };

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleOptionSelect = (category, value, label) => {
    setSelectedOptions((prevState) => ({ ...prevState, [category]: label }));
    handleChange({ target: { value } });
    setIsDropdownOpen((prevState) => ({ ...prevState, [category]: false }));
  };

  return (
    <div className={`h-[calc(100vh-2rem)] relative overflow-y-auto ${theme === "light"
      ? "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
      : "bg-gradient-to-br from-gray-900 via-slate-900 to-slate-800"
      }`}>


      {/* Main content */}
      <div className="relative z-10 p-6 space-y-6 pt-20">

        <div className="space-y-4">
          {Object.keys(options).map((key) => (
            <div
              key={key}
              className={`rounded-xl overflow-hidden backdrop-blur-sm ${theme === "light"
                ? "bg-white bg-opacity-70 shadow-lg"
                : "bg-gray-800 bg-opacity-50 shadow-lg"
                }`}
            >
              <button
                onClick={() => toggleDropdown(key)}
                className={`w-full px-5 py-4 flex items-center justify-between transition-all duration-200 ${theme === "light"
                  ? "hover:bg-gray-50 text-gray-800"
                  : "hover:bg-gray-700 text-gray-100"
                  }`}
                aria-expanded={isDropdownOpen[key]}
                aria-controls={`dropdown-${key}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-lg font-medium ${selectedOptions[key] === options[key][0].label
                    ? "opacity-60"
                    : "opacity-100"
                    }`}>
                    {selectedOptions[key]}
                  </span>
                </div>
                <div className={`transform transition-transform duration-200 ${isDropdownOpen[key] ? "rotate-180" : ""
                  }`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <div
                id={`dropdown-${key}`}
                className={`transition-all duration-200 ${isDropdownOpen[key]
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <div className={`p-3 ${theme === "light"
                  ? "border-t border-gray-100"
                  : "border-t border-gray-700"
                  }`}>
                  {options[key].map((option) => (
                    <div
                      key={option.value}
                      onClick={() => handleOptionSelect(key, option.value, option.label)}
                      className={`group flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${selectedOptions[key] === option.label
                        ? theme === "light"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-blue-900 bg-opacity-40 text-blue-200"
                        : theme === "light"
                          ? "hover:bg-gray-50 text-gray-700"
                          : "hover:bg-gray-700 text-gray-200"
                        }`}
                      role="option"
                      aria-selected={selectedOptions[key] === option.label}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selectedOptions[key] === option.label
                        ? theme === "light"
                          ? "border-blue-600 bg-blue-600"
                          : "border-blue-400 bg-blue-400"
                        : theme === "light"
                          ? "border-gray-300 group-hover:border-gray-400"
                          : "border-gray-600 group-hover:border-gray-500"
                        }`}>
                        {selectedOptions[key] === option.label && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <span className="flex-1">{option.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;