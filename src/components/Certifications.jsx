import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { certifications as staticCertifications } from "../data/portfolioData";
import { FaCertificate, FaTrash } from "react-icons/fa";
import axios from "axios";

const Certifications = () => {
    const [certData, setCertData] = useState([]);
    const [isApiConnected, setIsApiConnected] = useState(false);
    const { isAdmin, token } = useContext(AdminContext);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await axios.get("/api/certifications");
                setIsApiConnected(true);
                setCertData(res.data);
            } catch (err) {
                setIsApiConnected(false);
                setCertData(staticCertifications);
            }
        };
        fetchCerts();
    }, []);

    const [isAdding, setIsAdding] = useState(false);
    const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "" });

    const handleSaveCertification = async () => {
        if (!newCert.title || !newCert.issuer || !newCert.date) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await axios.post("/api/certifications", newCert, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCertData([...certData, res.data]);
            setIsAdding(false);
            setNewCert({ title: "", issuer: "", date: "" });
        } catch (err) {
            console.error("Failed to add certification", err);
            alert("Failed to add certification.");
        }
    };

    const handleDeleteCertification = async (id) => {
        if (!window.confirm("Are you sure you want to delete this certification?")) return;

        try {
            await axios.delete(`/api/certifications/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCertData(certData.filter(cert => cert._id !== id));
        } catch (err) {
            console.error("Failed to delete certification", err);
            alert("Failed to delete certification.");
        }
    };

    return (
        <div
            name="certifications"
            className="w-full h-auto bg-gradient-to-b from-gray-800 to-black text-white p-4"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">
                        Certifications
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 text-center">
                    {certData.map(({ _id, title, issuer, date }, id) => (
                        <div key={_id || id} className="relative shadow-md shadow-[#040c16] hover:scale-105 duration-500 py-2 rounded-lg glass p-4 flex items-center gap-4 group">
                            {isAdmin && _id && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteCertification(_id); }}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Delete Certification"
                                >
                                    <FaTrash size={12} />
                                </button>
                            )}

                            <FaCertificate size={40} className="text-yellow-500 mx-auto" />
                            <div className="text-left w-full">
                                <p className="font-bold text-xl">{title}</p>
                                <p className="text-gray-400">{issuer}</p>
                                <p className="text-gray-500 text-sm">{date}</p>
                            </div>
                        </div>
                    ))}

                    {isAdmin && (
                        isAdding ? (
                            <div className="shadow-md shadow-gray-700/20 py-2 rounded-lg border-2 border-dashed border-green-500 bg-gray-900/50 flex flex-col items-center justify-center gap-2 p-4">
                                <input
                                    type="text" placeholder="Title"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newCert.title} onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Issuer"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newCert.issuer} onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                                />
                                <input
                                    type="text" placeholder="Date (Year)"
                                    className="w-full bg-gray-800 text-white p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                    value={newCert.date} onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                                />
                                <div className="flex gap-2 w-full mt-2">
                                    <button
                                        onClick={handleSaveCertification}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => { setIsAdding(false); setNewCert({ title: "", issuer: "", date: "" }); }}
                                        className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-1 rounded text-sm transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="shadow-md shadow-gray-700/20 hover:scale-105 duration-500 py-2 rounded-lg border-2 border-dashed border-gray-600 hover:border-green-500 bg-gray-900/40 p-4 flex items-center justify-center gap-4 cursor-pointer group"
                                onClick={() => {
                                    if (!isApiConnected) {
                                        alert("API is not connected.");
                                        return;
                                    }
                                    setIsAdding(true);
                                }}
                            >
                                <div className="text-4xl text-gray-500 group-hover:text-green-500 mx-auto">+</div>
                                <p className="font-bold text-xl text-gray-400 group-hover:text-white">
                                    {isApiConnected ? "Add Certification" : "Add (Static)"}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Certifications;
