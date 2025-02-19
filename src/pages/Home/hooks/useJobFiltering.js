import { useJob } from "../contexts/JobContext";

export const useJobFiltering = () => {
  const {
    jobs,
    query,
    locationQuery,
    selectedCategory,
    currentPage,
    itemsPerPage,
  } = useJob();

  // Safe defaults for query and locationQuery
  const safeQuery = query ? query.toString() : "";
  const safeLocationQuery = locationQuery ? locationQuery.toString() : "";

  const filteredItems = jobs.filter((job) => {
    // Safe property access with fallback empty string
    const jobTitle = job.jobTitle ? job.jobTitle.toString() : "";
    const jobLocation = job.jobLocation ? job.jobLocation.toString() : "";
    const jobCompanyName = job.companyName ? job.companyName.toString() : ""; // Renamed to avoid conflict

    // Check if query matches either job title OR company name
    const titleMatch = jobTitle.toLowerCase().includes(safeQuery.toLowerCase());
    const companyMatch = jobCompanyName
      .toLowerCase()
      .includes(safeQuery.toLowerCase());
    const locationMatch = jobLocation
      .toLowerCase()
      .includes(safeLocationQuery.toLowerCase());

    // If no search criteria, include all jobs
    if (!safeQuery && !safeLocationQuery) return true;
    // If only searching by query (job title or company), match either
    if (safeQuery && !safeLocationQuery) return titleMatch || companyMatch;
    // If only searching by location, match location
    if (!safeQuery && safeLocationQuery) return locationMatch;
    // If searching by both, match all criteria
    return (titleMatch || companyMatch) && locationMatch;
  });

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const filteredData = () => {
    let filteredJobs = jobs;

    if (safeQuery || safeLocationQuery) {
      filteredJobs = filteredItems;
    }

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
          // Safe property checks for selectedCategory filtering
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
            safeExperienceLevel.toLowerCase() ===
              selectedCategory.toLowerCase() ||
            safeEmploymentType.toLowerCase() ===
              selectedCategory.toLowerCase() ||
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
