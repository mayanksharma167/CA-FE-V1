import { useParams, Navigate } from "react-router-dom";
import { CodeEditor } from "@/components/CodeEditor";
import { toast } from "sonner";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { ProblemDescription } from "@/components/ProblemDescription";
import { PROBLEMS } from "@/types/problem";

export default function Problem() {
    const { id } = useParams();
    const problem = PROBLEMS[id];

    if (!problem) {
        toast.error("Problem not found");
        return <Navigate to="/problems" replace />;
    }

    const runTestCases = () => {
        try {
            console.log("⚡ Executing your solution...\n");

            const userFunction = new Function('return ' + code)();

            let allTestsPassed = true;
            console.log("🧪 Running test cases...\n");

            const results = problem.testCases.map((testCase, index) => {
                try {
                    console.log(`Test Case ${index + 1}:`);
                    console.log(`Input:`, testCase.input);

                    const startTime = performance.now();
                    const result = userFunction(...Object.values(testCase.input));
                    const endTime = performance.now();
                    const executionTime = (endTime - startTime).toFixed(2);

                    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);

                    if (!passed) allTestsPassed = false;

                    console.log(`Your Output:`, result);
                    console.log(`Expected Output:`, testCase.expected);
                    console.log(`Time:`, `${executionTime}ms`);
                    console.log(`Status: ${passed ? '✅ Passed' : '❌ Failed'}\n`);

                    if (!passed) {
                        console.log(`Debug: Your solution returned ${JSON.stringify(result)} but we expected ${JSON.stringify(testCase.expected)}`);
                    }

                    return { passed, result, expected: testCase.expected, executionTime };
                } catch (error) {
                    allTestsPassed = false;
                    console.error(`❌ Error in test case ${index + 1}:`, error.message);
                    return { passed: false, error: error.message };
                }
            });

            if (allTestsPassed) {
                toast.success("All test cases passed! 🎉");
            } else {
                toast.error("Some test cases failed. Check the output for details.");
                console.log("\n💡 Tips for debugging:");
                console.log("1. Check your logic for edge cases");
                console.log("2. Make sure your function returns the correct type");
                console.log("3. Test your solution with simple examples first");
            }

        } catch (error) {
            console.error("❌ Code execution error:", error.message);
            console.log("\n🔍 Common issues that might have caused this error:");
            console.log("1. Syntax error in your code");
            console.log("2. Function is not returning the expected type");
            console.log("3. Undefined variables or incorrect variable names");
            toast.error("Error in code execution: " + error.message);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel defaultSize={40} minSize={30}>
                    <ProblemDescription problem={problem} />
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={60}>
                    <div className="h-screen p-6">
                        <CodeEditor
                            initialCode={problem.template}
                            onRun={runTestCases}
                        />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}
