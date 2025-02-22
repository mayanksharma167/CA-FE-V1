export default PROBLEMS = {
  1: {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers in nums such that they add up to target.
  
  You may assume that each input would have exactly one solution, and you may not use the same element twice.
  
  You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2].",
      },
    ],
    testCases: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        expected: [0, 1],
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        expected: [1, 2],
      },
      {
        input: { nums: [3, 3], target: 6 },
        expected: [0, 1],
      },
    ],
    template: `function twoSum(nums, target) {
      // Write your code here
      
  }`,
  },
  // ... keep existing code (other problems)
};
