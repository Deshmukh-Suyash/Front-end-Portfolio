import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import CountUp from "react-countup";
import { achievements as staticAchievements, iconMap } from "../data/portfolioData";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Achievements = () => {
    const { ref, inView } = useInView({ triggerOnce: true });

    const [achievementsData, setAchievementsData] = useState([]);
    const [isApiConnected, setIsApiConnected] = useState(false);
    const { isAdmin, token } = useContext(AdminContext);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const res = await axios.get("/api/achievements");
                setIsApiConnected(true);

                const mappedAchievements = (res.data || []).map(ach => ({
                    ...ach,
                    icon: iconMap[ach.icon] || iconMap["SiLeetcode"]
                }));
                setAchievementsData(mappedAchievements);
            } catch (err) {
                setIsApiConnected(false);
                setAchievementsData(staticAchievements);
            }
        };
        fetchAchievements();
    }, []);

    const [isAdding, setIsAdding] = useState(false);
    const [newAch, setNewAch] = useState({ title: "", count: "", suffix: "", icon: "" });

    const handleSaveAchievement = async () => {
        if (!newAch.title || !newAch.count) {
            alert("Title and Count are required");
            return;
        }

        try {
            const achToSave = {
                ...newAch,
                count: parseInt(newAch.count) || 0
            };
            const res = await axios.post("/api/achievements", achToSave, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const addedAch = {
                ...res.data,
                icon: iconMap[res.data.icon] || iconMap["SiLeetcode"]
            };
            setAchievementsData([...achievementsData, addedAch]);
            setIsAdding(false);
            setNewAch({ title: "", count: "", suffix: "", icon: "" });
        } catch (err) {
            console.error("Failed to add achievement", err);
            alert("Failed to add achievement.");
        }
    };

    const handleDeleteAchievement = async (id) => {
        if (!window.confirm("Are you sure you want to delete this achievement?")) return;

        try {
            await axios.delete(`/api/achievements/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setAchievementsData(achievementsData.filter(ach => ach._id !== id));
        } catch (err) {
            console.error("Failed to delete achievement", err);
            alert("Failed to delete achievement.");
        }
    };

    return (
        <div className="w-full bg-black text-white p-8">
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <h2 className="text-4xl font-bold inline border-b-4 border-gray-500 mb-8 self-start">Achievements</h2>

                <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
                    {achievementsData.map((item, index) => (
                        <div key={item._id || index} className="relative glass p-8 rounded-lg transform hover:-translate-y-2 transition-transform duration-300 shadow-purple-500/20 shadow-lg group">
                            {isAdmin && item._id && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteAchievement(item._id); }}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete Achievement"
                                >
                                    <FaTrash />
                                </button>
                            )}

                            <div className="text-4xl mb-4 text-blue-400 group-hover:scale-110 duration-300">
                                {item.icon}
                            </div>
                            <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                {inView && (
                                    <CountUp start={0} end={item.count} duration={2.5} separator="," />
                                )}
                                {item.suffix}
                            </div>
                            <p className="text-gray-400 text-xl font-medium">{item.title}</p>
                        </div>
                    ))}
                    {isAdmin && (
                        isAdding ? (
                            <div className="glass p-8 rounded-lg transform duration-300 shadow-gray-500/20 shadow-lg flex flex-col items-center justify-center border-2 border-dashed border-green-500 bg-gray-900/50 gap-2">
                                <input
                                    type="text" placeholder="Title (e.g. CodeChef)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newAch.title} onChange={(e) => setNewAch({ ...newAch, title: e.target.value })}
                                />
                                <input
                                    type="number" placeholder="Count (e.g. 500)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newAch.count} onChange={(e) => setNewAch({ ...newAch, count: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Suffix (e.g. +)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newAch.suffix} onChange={(e) => setNewAch({ ...newAch, suffix: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Icon Key (e.g. SiLeetcode)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newAch.icon} onChange={(e) => setNewAch({ ...newAch, icon: e.target.value })}
                                />

                                <div className="flex gap-2 w-full mt-2">
                                    <button onClick={handleSaveAchievement} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm transition-colors">Save</button>
                                    <button onClick={() => setIsAdding(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 rounded text-sm transition-colors">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="glass p-8 rounded-lg transform hover:-translate-y-2 transition-transform duration-300 shadow-gray-500/20 shadow-lg group flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-gray-600 hover:border-green-500 bg-gray-900/40"
                                onClick={() => {
                                    if (!isApiConnected) {
                                        alert("API is not connected.");
                                        return;
                                    }
                                    setIsAdding(true);
                                }}
                            >
                                <div className="text-6xl mb-4 text-gray-500 group-hover:text-green-500 transition-colors">+</div>
                                <p className="text-gray-400 text-xl font-medium group-hover:text-white">
                                    {isApiConnected ? "Add Achievement" : "Add (Static)"}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
