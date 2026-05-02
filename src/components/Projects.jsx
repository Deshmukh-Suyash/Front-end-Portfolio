import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { projects as staticProjects } from "../data/portfolioData";
import { Tilt } from "react-tilt";
import { FaGithub, FaLink, FaTrash } from "react-icons/fa";
import axios from "axios";

const Projects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [isApiConnected, setIsApiConnected] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [newProject, setNewProject] = useState({ title: "", description: "", link: "", tags: "", image: "" });
    const { isAdmin, token } = useContext(AdminContext);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get("/api/projects");
                setIsApiConnected(true);
                setProjectsData(res.data);
            } catch (err) {
                setIsApiConnected(false);
                setProjectsData(staticProjects);
            }
        };
        fetchProjects();
    }, []);

    const handleSaveProject = async () => {
        if (!newProject.title || !newProject.description) {
            alert("Title and Description are required");
            return;
        }

        const tagsArray = newProject.tags ? newProject.tags.split(",").map(tag => tag.trim()) : [];

        try {
            const projectToSave = { ...newProject, tags: tagsArray };
            const res = await axios.post("/api/projects", projectToSave, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjectsData([...projectsData, res.data]);
            setIsAdding(false);
            setNewProject({ title: "", description: "", link: "", tags: "", image: "" });
        } catch (err) {
            console.error("Failed to add project", err);
            alert("Failed to add project.");
        }
    };

    const handleDeleteProject = async (id, isStatic) => {
        if (!window.confirm("Are you sure you want to delete this project?")) return;

        if (isStatic) {
            setProjectsData(projectsData.filter(proj => proj.id !== id));
            alert("This static project has been removed from your view. To remove it permanently, edit 'src/data/portfolioData.jsx'.");
            return;
        }

        try {
            await axios.delete(`/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProjectsData(projectsData.filter(proj => proj._id !== id));
        } catch (err) {
            console.error("Failed to delete project", err);
            alert("Failed to delete project.");
        }
    };

    return (
        <div
            name="projects"
            className="w-full h-auto bg-gradient-to-b from-black to-gray-800 text-white p-4"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">
                        Projects
                    </p>
                    <p className="py-6 text-xl text-gray-400">Check out some of my work right here</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {projectsData.map(({ _id, id, title, description, link, tags, image }, index) => {
                        const isStatic = !_id;
                        return (
                            <div key={_id || id || index} className="relative h-full">
                                <Tilt className="shadow-lg shadow-[#040c16] rounded-lg duration-200 hover:scale-105 glass border border-gray-600 h-full relative group">
                                {isAdmin && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleDeleteProject(_id || id, isStatic); }}
                                        className="absolute top-2 right-2 z-50 text-red-500 bg-black/60 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 hover:text-white"
                                        title={isStatic ? "Remove Static Project (Local View Only)" : "Delete Project Permanently"}
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                )}

                                    <div className="h-48 w-full bg-gradient-to-tr from-blue-900 to-purple-900 rounded-t-lg flex items-center justify-center overflow-hidden">
                                        {image ? (
                                            <img src={image} alt={title} className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-4xl font-bold text-white/20">Project Preview</span>
                                        )}
                                    </div>
                                    <div className="p-4 flex flex-col justify-between h-[200px]">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-3 mb-2">{description}</p>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {tags.map((tag, i) => (
                                                    <span key={i} className="text-xs font-semibold px-2 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-start gap-4 mt-4">
                                            <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                                <FaLink />
                                                <span>Demo</span>
                                            </a>
                                            <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
                                                <FaGithub />
                                                <span>Code</span>
                                            </a>
                                        </div>
                                    </div>
                                </Tilt>
                            </div>
                        );
                    })}

                    {isAdmin && (
                        isAdding ? (
                            <div className="shadow-lg shadow-gray-700/20 rounded-lg p-4 border-2 border-dashed border-green-500 bg-gray-900/50 flex flex-col gap-2 h-auto min-h-[400px]">
                                <h3 className="text-xl font-bold text-gray-300 mb-2">New Project</h3>
                                <input
                                    type="text" placeholder="Title"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                                    value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                />
                                <textarea
                                    placeholder="Description" rows="3"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:ring-1 focus:ring-green-500 focus:outline-none resize-none"
                                    value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Link (URL)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                                    value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Tags (comma separated)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                                    value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Image URL (optional)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:ring-1 focus:ring-green-500 focus:outline-none"
                                    value={newProject.image} onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                />

                                <div className="flex gap-2 w-full mt-auto pt-4">
                                    <button onClick={handleSaveProject} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition-colors">Save</button>
                                    <button onClick={() => setIsAdding(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition-colors">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="shadow-lg shadow-gray-700/20 rounded-lg duration-200 hover:scale-105 border-2 border-dashed border-gray-600 hover:border-green-500 flex flex-col items-center justify-center bg-gray-900/30 cursor-pointer h-[400px]"
                                onClick={() => {
                                    if (!isApiConnected) {
                                        alert("API is not connected");
                                        return;
                                    }
                                    setIsAdding(true);
                                }}
                            >
                                <div className="text-8xl text-gray-600 hover:text-green-500 transition-colors mb-4">+</div>
                                <p className="text-xl font-bold text-gray-400 hover:text-white">
                                    Add New Project
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Projects;
