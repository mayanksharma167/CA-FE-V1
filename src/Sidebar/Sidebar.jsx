import React, { useState, useContext } from "react";
import { ChevronDown, ChevronUp, Sun, Moon } from "lucide-react";
import { ThemeContext } from "../context/themeContext"; // Import your ThemeContext

const Sidebar = ({ handleChange }) => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function
  const [isDropdownOpen, setIsDropdownOpen] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({
    location: "Location",
    salaryType: "Any",
    salaryRange: "Any",
    experience: "Any experience",
    employmentType: "Employment Type",
    jobPostingDate: "Date of Posting",
  });

  const options = {
    location: [
      { value: "", label: "All" },
      { value: "gurgaon", label: "Gurgaon" },
      { value: "bengaluru", label: "Bengaluru" },
      { value: "hyderabad", label: "Hyderabad" },
      { value: "mumbai", label: "Mumbai" },
    ],
    salaryType: [
      { value: "", label: "Any" },
      { value: "hourly", label: "Hourly" },
      { value: "monthly", label: "Monthly" },
      { value: "yearly", label: "Yearly" },
    ],
    salaryRange: [
      { value: "", label: "Any" },
      { value: "30", label: "< 30,000" },
      { value: "50", label: "< 50,000" },
      { value: "80", label: "< 80,000" },
      { value: "100", label: "< 100,000" },
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
    <div
      className={`h-[calc(100vh-2rem)] overflow-y-auto p-4 lg:pt-14 ${theme === "light" ? "bg-[#bbc4c2] text-gray-800" : "bg-slate-950 text-creamWhite"
        }`}
    >
      <div className="space-y-6">
        {/* Theme Toggle Button */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold mb-4">Filters</h3>

        </div>

        {/* Dropdown Filters */}
        {Object.keys(options).map((key) => (
          <div
            key={key}
            className={`border ${theme === "light" ? "border-gray-300" : "border-emerald-700"
              } rounded-lg`}
          >
            <button
              onClick={() => toggleDropdown(key)}
              className={`w-full px-4 py-3 flex items-center justify-between ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-emerald-900"
                } rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 ${theme === "light" ? "focus:ring-gray-400" : "focus:ring-emerald-500"
                }`}
              aria-expanded={isDropdownOpen[key]}
              aria-controls={`dropdown-${key}`}
            >
              <h4 className="text-lg font-medium">{selectedOptions[key]}</h4>
              {isDropdownOpen[key] ? <ChevronUp /> : <ChevronDown />}
            </button>
            <div
              id={`dropdown-${key}`}
              className={`transition-all duration-300 overflow-hidden ${isDropdownOpen[key] ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
                }`}
            >
              {options[key].map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionSelect(key, option.value, option.label)}
                  className={`cursor-pointer px-3 py-2 rounded-md transition-colors duration-300 ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-emerald-800"
                    } flex items-center gap-2 ${selectedOptions[key] === option.label ? (theme === "light" ? "bg-gray-300" : "bg-emerald-700") : ""
                    }`}
                  role="option"
                  aria-selected={selectedOptions[key] === option.label}
                >
                  <input
                    type="radio"
                    id={`${key}-${option.value}`}
                    name={key}
                    value={option.value}
                    checked={selectedOptions[key] === option.label}
                    readOnly
                    className={`accent-${theme === "light" ? "gray-500" : "emerald-500"}`}
                  />
                  <label htmlFor={`${key}-${option.value}`} className="cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;