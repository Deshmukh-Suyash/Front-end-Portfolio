import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import resume from "../assets/suyashresume.pdf";

const About = () => {
    return (
        <div
            name="about"
            className="w-full min-h-screen h-auto py-20 bg-gradient-to-b from-gray-800 to-black text-white"
        >
            <div className="max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">
                        About Me
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-around gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2"
                    >
                        <Tilt className="Tilt" options={{ max: 25, scale: 1.05 }}>
                            <div className="glass p-8 rounded-2xl border border-gray-600 bg-gray-900/50 shadow-blue-500/20 shadow-2xl">
                                <p className="text-xl mt-5 text-gray-300 leading-relaxed">
                                    I am a passionate <span className="text-blue-400 font-bold">Computer Science student</span> with a strong foundation in <span className="text-orange-400 font-bold">Java</span>, Data Structures, and Algorithms.
                                </p>
                                <br />
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    I thrive on solving complex problems and building efficient, scalable web applications using the MERN stack. I'm constantly learning and exploring new technologies to stay ahead in the tech world.
                                </p>
                            </div>
                        </Tilt>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="md:w-1/2 flex flex-col gap-4 text-gray-300"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            Why Work With Me?
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-lg">
                            <li>Strong Problem Solving (150+ DSA Problems Solved)</li>
                            <li>Full Stack Development Expertise</li>
                            <li>Clean & Modern UI/UX Design Sensibility</li>
                            <li>Detail-Oriented & Team Player</li>
                        </ul>

                        <div className="mt-8">
                            <a href={resume} download="Suyash_Resume.pdf" className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg font-bold text-white shadow-lg hover:scale-105 transition-transform inline-block">
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
