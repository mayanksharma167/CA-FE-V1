import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const AdminDashBoard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalHits: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

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
            setStats(data);
        } catch (err) {
            console.error("Error fetching stats:", err);
            setError("Failed to load dashboard data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats(selectedDate);
    }, [selectedDate]);

    const chartData = [
        { name: "Active Users", value: stats.totalUsers },
        { name: "Page Hits", value: stats.totalHits },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <motion.div
                className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <CheckCircle className="text-green-500" /> Admin Dashboard
                </h2>
                <p className="text-gray-600 mt-2">Monitor user activity and page visits</p>

                {/* 📅 Date Picker */}
                <div className="mt-4 flex items-center gap-2">
                    <Calendar className="text-gray-600" />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 text-black"
                    />
                </div>

                {loading ? (
                    <p className="text-gray-500 mt-4 text-center">Loading data...</p>
                ) : error ? (
                    <div className="text-red-500 mt-4 flex items-center gap-2">
                        <AlertCircle /> {error}
                    </div>
                ) : (
                    <>
                        <div className="mt-6">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="value" fill="#4CAF50" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 text-gray-700 text-center">
                            <p>Total Active Users: <strong>{stats.totalUsers}</strong></p>
                            <p>Total Page Hits: <strong>{stats.totalHits}</strong></p>
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default AdminDashBoard;
