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

  const filteredItems = jobs.filter((job) => {
    const titleMatch = job.jobTitle.toLowerCase().includes(query.toLowerCase());
    const locationMatch = job.jobLocation
      .toLowerCase()
      .includes(locationQuery.toLowerCase());

    if (!query && !locationQuery) return true;
    if (query && !locationQuery) return titleMatch;
    if (!query && locationQuery) return locationMatch;
    return titleMatch && locationMatch;
  });

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const filteredData = () => {
    let filteredJobs = jobs;

    if (query || locationQuery) {
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
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate === selectedCategory ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
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
