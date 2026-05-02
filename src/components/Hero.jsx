import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaChevronDown, FaFileDownload } from "react-icons/fa";
import heroImage from "../assets/suyash.png";
import resume from "../assets/suyashresume.pdf";

const Hero = () => {
    const particlesInit = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    const [text, setText] = React.useState("");
    const fullText = "Full Stack Developer";

    React.useEffect(() => {
        let i = 0;
        const typingInterval = setInterval(() => {
            setText(fullText.slice(0, i + 1));
            i++;
            if (i > fullText.length) clearInterval(typingInterval);
        }, 100);
        return () => clearInterval(typingInterval);
    }, []);

    return (
        <div
            name="home"
            className="h-screen w-full bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden"
        >
            <Particles
                id="tsparticles"
                init={particlesInit}
                options={{
                    background: { color: { value: "transparent" } },
                    fpsLimit: 60,
                    interactivity: {
                        events: {
                            onClick: { enable: true, mode: "push" },
                            onHover: { enable: true, mode: "bubble" },
                            resize: true,
                        },
                        modes: {
                            push: { quantity: 2 },
                            bubble: { distance: 200, size: 4, duration: 2, opacity: 0.8 },
                        },
                    },
                    particles: {
                        color: { value: ["#3b82f6", "#8b5cf6"] },
                        links: {
                            enable: false,
                        },
                        move: {
                            direction: "top",
                            enable: true,
                            outModes: { default: "out" },
                            random: true,
                            speed: 1,
                            straight: false,
                        },
                        number: { density: { enable: true, area: 800 }, value: 30 },
                        opacity: {
                            value: { min: 0.1, max: 0.5 },
                            animation: { enable: true, speed: 1, minimumValue: 0.1, sync: false }
                        },
                        shape: { type: "circle" },
                        size: {
                            value: { min: 2, max: 5 },
                            animation: { enable: true, speed: 2, minimumValue: 2, sync: false }
                        },
                    },
                    detectRetina: true,
                }}
                className="absolute inset-0 z-0"
            />

            <div className="max-w-screen-lg mx-auto flex flex-col md:grid md:grid-cols-2 items-center justify-center h-full px-4 relative z-10">

                <div className="flex flex-col justify-center h-full text-center md:text-left order-2 md:order-1 pt-10 md:pt-0">
                    <motion.h1
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
                    >
                        Suyash Deshmukh
                    </motion.h1>

                    <h2 className="text-2xl sm:text-4xl font-light text-gray-300 min-h-[40px] flex items-center justify-center md:justify-start gap-2">
                        I'm a <span className="text-blue-400 font-medium">{text}</span>
                        <span className="animate-pulse">|</span>
                    </h2>

                    <p className="text-gray-400 max-w-lg mt-6 text-lg">
                        Building minimalist, high-performance web applications with a focus on modern UI/UX design.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center"
                    >
                        <Link
                            to="projects"
                            smooth
                            duration={500}
                            className="group text-white w-fit px-8 py-3 flex items-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer hover:scale-105 transition-transform shadow-lg shadow-blue-500/50"
                        >
                            View Work
                            <span className="group-hover:rotate-90 duration-300 ml-2">
                                <FaChevronDown />
                            </span>
                        </Link>
                        <a
                            href={resume}
                            download="Suyash_Resume.pdf"
                            className="group text-white w-fit px-8 py-3 flex items-center rounded-full border-2 border-blue-500 cursor-pointer hover:bg-blue-500/10 hover:scale-105 transition-all shadow-lg shadow-blue-500/20"
                        >
                            Resume
                            <span className="ml-2 group-hover:translate-y-1 duration-300">
                                <FaFileDownload />
                            </span>
                        </a>
                    </motion.div>
                </div>

                <div className="flex justify-center items-center order-1 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-75 animate-pulse"></div>
                        <img
                            src={heroImage}
                            alt="Suyash Deshmukh"
                            className="relative rounded-full w-48 h-48 md:w-80 md:h-80 object-cover border-4 border-black shadow-2xl z-10"
                        />
                    </motion.div>
                </div>

            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500 hidden md:block">
                <FaChevronDown size={30} />
            </div>
        </div>
    );
};

export default Hero;
