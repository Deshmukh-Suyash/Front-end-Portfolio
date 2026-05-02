import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { skills as staticSkills, iconMap } from "../data/portfolioData";
import { motion } from "framer-motion";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Skills = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [isApiConnected, setIsApiConnected] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: "", icon: "" });
    const { isAdmin, token } = useContext(AdminContext);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get("/api/skills");
                setIsApiConnected(true);

                const mappedSkills = (res.data || []).map(skill => ({
                    ...skill,
                    icon: iconMap[skill.icon] || iconMap["FaCode"]
                }));
                setSkillsData(mappedSkills);
            } catch (err) {
                setIsApiConnected(false);
                setSkillsData(staticSkills);
            }
        };
        fetchSkills();
    }, []);

    const handleSaveSkill = async () => {
        if (!newSkill.name || !newSkill.icon) {
            alert("Please fill in both fields");
            return;
        }

        try {
            const res = await axios.post("/api/skills", newSkill, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const addedSkill = {
                ...res.data,
                icon: iconMap[res.data.icon] || iconMap["FaCode"]
            };
            setSkillsData([...skillsData, addedSkill]);
            setIsAdding(false);
            setNewSkill({ name: "", icon: "" });
        } catch (err) {
            console.error("Failed to add skill", err);
            alert("Failed to add skill.");
        }
    };

    const handleDeleteSkill = async (id) => {
        if (!window.confirm("Are you sure you want to delete this skill?")) return;

        try {
            await axios.delete(`/api/skills/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSkillsData(skillsData.filter(skill => skill._id !== id));
        } catch (err) {
            console.error("Failed to delete skill", err);
            alert("Failed to delete skill.");
        }
    };

    return (
        <div
            name="skills"
            className="w-full h-auto min-h-screen bg-gradient-to-b from-black to-gray-800 text-white p-4"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold border-b-4 border-gray-500 p-2 inline">
                        Skills
                    </p>
                    <p className="py-6 text-xl text-gray-400">These are the technologies I work with</p>
                </div>

                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 text-center py-8">
                    {skillsData.map((skill, id) => (
                        <motion.div
                            key={skill._id || id}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: id * 0.1 }}
                            className="relative shadow-md shadow-[#040c16] hover:scale-110 duration-500 py-6 rounded-lg glass bg-gray-800/40 flex flex-col items-center justify-center gap-4 group border border-gray-700 hover:border-blue-500/50"
                        >
                            {isAdmin && skill._id && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteSkill(skill._id); }}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete Skill"
                                >
                                    <FaTrash />
                                </button>
                            )}

                            <div className="text-5xl group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all">
                                {skill.icon}
                            </div>
                            <p className="mt-2 font-medium text-gray-300 group-hover:text-white">{skill.name}</p>
                        </motion.div>
                    ))}
                    {isAdmin && (
                        isAdding ? (
                            <div className="shadow-md shadow-gray-700/20 py-6 rounded-lg border-2 border-dashed border-green-500 bg-gray-900/50 flex flex-col items-center justify-center gap-2 p-4">
                                <input
                                    type="text"
                                    placeholder="Icon Key (e.g. FaReact)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newSkill.icon}
                                    onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="Skill Name"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm mb-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                />
                                <div className="flex gap-2 w-full">
                                    <button
                                        onClick={handleSaveSkill}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsAdding(false);
                                            setNewSkill({ name: "", icon: "" });
                                        }}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 rounded text-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="shadow-md shadow-gray-700/20 hover:scale-105 duration-300 py-6 rounded-lg border-2 border-dashed border-gray-600 hover:border-green-500 bg-gray-900/30 flex flex-col items-center justify-center gap-4 cursor-pointer group"
                                onClick={() => {
                                    if (!isApiConnected) {
                                        alert("API is not connected.");
                                        return;
                                    }
                                    setIsAdding(true);
                                }}
                            >
                                <div className="text-5xl text-gray-600 group-hover:text-green-500 transition-colors">+</div>
                                <p className="mt-2 font-medium text-gray-400 group-hover:text-white">
                                    Add Skill
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Skills;
