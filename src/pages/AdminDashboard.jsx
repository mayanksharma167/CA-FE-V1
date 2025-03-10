import React, { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
    LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import {
    Calendar,
    BarChart2,
    PieChart as PieChartIcon,
    TrendingUp,
    Activity,
    Users,
    MousePointer,
    RefreshCw,
    ChevronDown,
    Search,
    Server,
    Clock
} from "lucide-react";

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalHits: 0
    });
    const [historicalData, setHistoricalData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
    const [chartType, setChartType] = useState("line");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dateRange, setDateRange] = useState("week"); // "day", "week", "month"

    // Fetch dashboard data for a specific date
    const fetchStats = async (date) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/dashboard`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date }),
            });

            if (!response.ok) throw new Error("Failed to fetch data");

            const data = await response.json();

            if (data.success) {
                setStats({
                    totalUsers: data.totalUsers,
                    totalHits: data.totalHits,
                });

                // Also fetch historical data whenever we update current stats
                fetchHistoricalData(date, dateRange);
            } else {
                throw new Error(data.message || "Unknown error occurred");
            }
        } catch (err) {
            console.error("Error fetching stats:", err);
            setError("Failed to load dashboard data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch historical data for trends
    const fetchHistoricalData = async (endDate, range) => {
        try {
            // Calculate start date based on range
            const end = new Date(endDate);
            const start = new Date(endDate);

            let days = 7; // default for week
            if (range === "day") days = 1;
            if (range === "month") days = 30;

            start.setDate(start.getDate() - days + 1);

            // Create an array of dates to fetch
            const dates = [];
            const currentDate = new Date(start);
            while (currentDate <= end) {
                dates.push(new Date(currentDate).toISOString().split("T")[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            // Fetch data for each date
            const dataPromises = dates.map(date =>
                fetch(`${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/dashboard`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ date }),
                }).then(res => res.json())
            );

            const results = await Promise.all(dataPromises);

            // Process and format the data for charts
            const formattedData = results.map((result, index) => {
                if (!result.success) return null;

                // Format date for display (e.g., "Mar 10")
                const dateObj = new Date(dates[index]);
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric'
                });

                return {
                    date: formattedDate,
                    users: result.totalUsers,
                    hits: result.totalHits,
                    // Calculate a page views per user metric
                    hitsPerUser: result.totalUsers > 0
                        ? parseFloat((result.totalHits / result.totalUsers).toFixed(2))
                        : 0
                };
            }).filter(item => item !== null);

            setHistoricalData(formattedData);

        } catch (err) {
            console.error("Error fetching historical data:", err);
            // We don't set the main error state here to avoid blocking the UI
            // Just log to console
        }
    };

    useEffect(() => {
        fetchStats(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        if (stats.totalUsers > 0) {
            fetchHistoricalData(selectedDate, dateRange);
        }
    }, [dateRange]);

    // Calculate additional metrics
    const avgHitsPerUser = stats.totalUsers > 0
        ? (stats.totalHits / stats.totalUsers).toFixed(2)
        : 0;

    // Prepare data for summary stats
    const barChartData = [
        { name: "Active Users", value: stats.totalUsers },
        { name: "Page Hits", value: stats.totalHits },
    ];

    const pieChartData = [
        { name: "Active Users", value: stats.totalUsers },
        { name: "Page Hits", value: stats.totalHits },
    ];

    const COLORS = ["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"];

    // Stat Card component for reusability
    const StatCard = ({ icon, title, value, suffix, bgColor }) => (
        <div className={`${bgColor} p-4 rounded-lg shadow-md flex items-center justify-between`}>
            <div>
                <p className="text-sm font-medium text-white/80">{title}</p>
                <p className="text-2xl font-bold text-white mt-1">
                    {value}{suffix && <span className="text-sm ml-1">{suffix}</span>}
                </p>
            </div>
            <div className="bg-white/20 p-2 rounded-full">
                {icon}
            </div>
        </div>
    );

    const renderChart = () => {
        const chartData = chartType === "bar" || chartType === "pie"
            ? barChartData
            : historicalData;

        if (chartData.length === 0 && (chartType === "line" || chartType === "area")) {
            return (
                <div className="h-64 flex items-center justify-center text-gray-500">
                    No historical data available
                </div>
            );
        }

        switch (chartType) {
            case "bar":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barChartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case "line":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={historicalData}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="users" name="Active Users" stroke="#6366f1" strokeWidth={2} />
                            <Line type="monotone" dataKey="hits" name="Page Hits" stroke="#ec4899" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case "pie":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                );
            case "area":
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={historicalData}>
                            <defs>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorHits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Area type="monotone" dataKey="users" name="Active Users" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsers)" />
                            <Area type="monotone" dataKey="hits" name="Page Hits" stroke="#ec4899" fillOpacity={1} fill="url(#colorHits)" />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen relative pt-12">
            <div className="max-w-6xl mx-auto p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-500 mt-1">IP and Page Visit Analytics</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200">
                            <Calendar className="text-gray-600 h-5 w-5" />
                            <input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="border-none focus:ring-0 text-gray-700 font-medium"
                            />
                        </div>

                        <button
                            onClick={() => fetchStats(selectedDate)}
                            className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 font-medium shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Refresh
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="h-96 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
                        {error}
                    </div>
                ) : (
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <StatCard
                                icon={<Users className="h-6 w-6 text-white" />}
                                title="Unique Visitors"
                                value={stats.totalUsers}
                                bgColor="bg-indigo-600"
                            />
                            <StatCard
                                icon={<MousePointer className="h-6 w-6 text-white" />}
                                title="Page Hits"
                                value={stats.totalHits}
                                bgColor="bg-pink-600"
                            />
                            <StatCard
                                icon={<Activity className="h-6 w-6 text-white" />}
                                title="Hits Per User"
                                value={avgHitsPerUser}
                                bgColor="bg-amber-600"
                            />
                            <StatCard
                                icon={<Server className="h-6 w-6 text-white" />}
                                title="API Usage"
                                value={stats.totalHits}
                                bgColor="bg-emerald-600"
                            />
                        </div>

                        {/* Chart Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800">Traffic Overview</h2>

                                <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                                    {/* Time Range Selector (Only for line/area charts) */}
                                    {(chartType === "line" || chartType === "area") && (
                                        <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
                                            <button
                                                onClick={() => setDateRange("day")}
                                                className={`px-3 py-1.5 text-sm font-medium ${dateRange === "day"
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-500 hover:bg-gray-50"}`}
                                            >
                                                Day
                                            </button>
                                            <button
                                                onClick={() => setDateRange("week")}
                                                className={`px-3 py-1.5 text-sm font-medium ${dateRange === "week"
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-500 hover:bg-gray-50"}`}
                                            >
                                                Week
                                            </button>
                                            <button
                                                onClick={() => setDateRange("month")}
                                                className={`px-3 py-1.5 text-sm font-medium ${dateRange === "month"
                                                    ? "bg-indigo-600 text-white"
                                                    : "bg-white text-gray-500 hover:bg-gray-50"}`}
                                            >
                                                Month
                                            </button>
                                        </div>
                                    )}

                                    {/* Chart Type Selector */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setDropdownOpen(!dropdownOpen)}
                                            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-2 rounded-lg text-gray-700 font-medium"
                                        >
                                            {chartType === "bar" && <BarChart2 className="h-4 w-4" />}
                                            {chartType === "line" && <TrendingUp className="h-4 w-4" />}
                                            {chartType === "pie" && <PieChartIcon className="h-4 w-4" />}
                                            {chartType === "area" && <Activity className="h-4 w-4" />}

                                            {chartType === "bar" && "Bar Chart"}
                                            {chartType === "line" && "Line Chart"}
                                            {chartType === "pie" && "Pie Chart"}
                                            {chartType === "area" && "Area Chart"}

                                            <ChevronDown className="h-4 w-4" />
                                        </button>

                                        {dropdownOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-lg shadow-lg border border-gray-800 z-10">
                                                <ul className="py-1">
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                        onClick={() => { setChartType("bar"); setDropdownOpen(false); }}
                                                    >
                                                        <BarChart2 className="h-4 w-4 text-gray-500" />
                                                        <span>Bar Chart</span>
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                        onClick={() => { setChartType("line"); setDropdownOpen(false); }}
                                                    >
                                                        <TrendingUp className="h-4 w-4 text-gray-500" />
                                                        <span>Line Chart</span>
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                        onClick={() => { setChartType("pie"); setDropdownOpen(false); }}
                                                    >
                                                        <PieChartIcon className="h-4 w-4 text-gray-500" />
                                                        <span>Pie Chart</span>
                                                    </li>
                                                    <li
                                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-600 cursor-pointer"
                                                        onClick={() => { setChartType("area"); setDropdownOpen(false); }}
                                                    >
                                                        <Activity className="h-4 w-4 text-gray-500" />
                                                        <span>Area Chart</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {renderChart()}
                        </div>

                        {/* Additional Data */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Traffic Insights */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Traffic Insights</h2>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">User to Hit Ratio</span>
                                            <span className="font-medium">{avgHitsPerUser} hits/user</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-indigo-600 h-2.5 rounded-full"
                                                style={{ width: `${Math.min((avgHitsPerUser / 10) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                                            <span>0</span>
                                            <span>5</span>
                                            <span>10+</span>
                                        </div>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Today's Stats</h3>
                                        <p className="text-gray-600 mb-1">Unique Visitors: <span className="font-medium">{stats.totalUsers}</span></p>
                                        <p className="text-gray-600 mb-1">Total Page Hits: <span className="font-medium">{stats.totalHits}</span></p>
                                        <p className="text-gray-600">API Requests: <span className="font-medium">{stats.totalHits}</span></p>
                                    </div>

                                    <div className="border-t pt-4">
                                        <h3 className="text-sm font-medium text-gray-700 mb-2">Related Resources</h3>
                                        <ul className="space-y-1">
                                            <li className="text-indigo-600 hover:underline cursor-pointer">View IP Log Details</li>
                                            <li className="text-indigo-600 hover:underline cursor-pointer">Generate Traffic Report</li>
                                            <li className="text-indigo-600 hover:underline cursor-pointer">Configure IP Tracking Settings</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <h2 className="text-xl font-bold text-gray-800 mb-4">System Overview</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Server className="h-5 w-5 text-indigo-600" />
                                            <div>
                                                <p className="font-medium text-gray-800">IpTracker Collection</p>
                                                <p className="text-sm text-gray-500">Recording IP addresses and requests</p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Search className="h-5 w-5 text-pink-600" />
                                            <div>
                                                <p className="font-medium text-gray-800">Job Search API</p>
                                                <p className="text-sm text-gray-500">Handling search requests</p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Active</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Clock className="h-5 w-5 text-amber-600" />
                                            <div>
                                                <p className="font-medium text-gray-800">System Status</p>
                                                <p className="text-sm text-gray-500">All services operational</p>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">Healthy</span>
                                    </div>

                                    <div className="mt-6 border-t pt-4">
                                        <h3 className="font-medium text-gray-700 mb-2">Related Features</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
                                                Manage Jobs
                                            </button>
                                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
                                                User Management
                                            </button>
                                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
                                                Database Backup
                                            </button>
                                            <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 font-medium transition-colors">
                                                System Logs
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;