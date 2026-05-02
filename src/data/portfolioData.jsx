import {
    FaJava, FaCode, FaLaptopCode, FaCogs, FaServer,
    FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaDatabase, FaPython
} from "react-icons/fa";
import { SiLeetcode, SiCodechef, SiCplusplus, SiGeeksforgeeks, SiMongodb, SiMysql, SiPostman } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

// Icon Mapping
export const iconMap = {
    "FaJava": <FaJava className="text-orange-500" />,
    "SiCplusplus": <SiCplusplus className="text-blue-500" />,
    "FaCode": <FaCode className="text-green-500" />,
    "FaLaptopCode": <FaLaptopCode className="text-yellow-400" />,
    "FaCogs": <FaCogs className="text-cyan-400" />,
    "FaServer": <FaServer className="text-green-600" />,
    "FaDatabase": <FaDatabase className="text-gray-400" />,
    "FaGithub": <FaGithub className="text-white" />,
    "VscVscode": <VscVscode className="text-blue-400" />,
    "SiLeetcode": <SiLeetcode />,
    "SiCodechef": <SiCodechef />,
    "SiGeeksforgeeks": <SiGeeksforgeeks />,
    "SiMongodb": <SiMongodb className="text-green-500" />,
    "SiMysql": <SiMysql className="text-blue-500" />,
    "SiPostman": <SiPostman className="text-orange-500" />,
    "FaPython": <FaPython className="text-yellow-300" />
};

export const personalInfo = {
    name: "Suyash Deshmukh",
    title: "Full Stack Developer | Java Specialist",
    email: "deshmukhsuyash96@gamil.com",
    phone: "+91-8815936977",
    about: "I am a passionate computer science student with a strong foundation in Java, Data Structures, and Algorithms. I thrive on solving complex problems and building efficient, scalable web applications.",
    socials: {
        linkedin: "https://www.linkedin.com/in/suyash-deshmukh-123456789/",
        codolio: "https://codolio.com/profile/suyash_545412",
        leetcode: "https://leetcode.com/u/suyash_deshmukh/",
        codechef: "https://www.codechef.com/users/suyash_545412",
        github: "https://github.com/StartSomethingNew"
    }
};

export const education = [
    {
        institution: "Lakshmi Narain College of Technology and Science, Bhopal",
        degree: "B.Tech CSE",
        year: "2023 – 2027",
        details: "RGPV University",
        score: "Currently Pursuing"
    },
    {
        institution: "Vasant International Public School",
        degree: "Class 12",
        year: "2022",
        details: "CBSE Board",
        score: "79.6%"
    },
    {
        institution: "Vasant International Public School",
        degree: "Class 10",
        year: "2020",
        details: "CBSE Board",
        score: "79.4%"
    }
];

export const skills = [
    { name: "Java", icon: <FaJava className="text-orange-500" /> },
    { name: "C++", icon: <SiCplusplus className="text-blue-500" /> },
    { name: "DSA", icon: <FaCode className="text-green-500" /> },
    { name: "Web Dev", icon: <FaLaptopCode className="text-yellow-400" /> },
    { name: "React", icon: <FaCogs className="text-cyan-400" /> },
    { name: "Node.js", icon: <FaServer className="text-green-600" /> },
    { name: "Database", icon: <FaDatabase className="text-gray-400" /> }, // Added generic DB icon
    { name: "GitHub", icon: <FaGithub className="text-white" /> },
    { name: "VS Code", icon: <VscVscode className="text-blue-400" /> }
];

export const achievements = [
    { title: "DSA Solved", count: 150, suffix: "+", icon: <SiLeetcode /> },
    { title: "LeetCode", count: 1400, suffix: "+", icon: <SiLeetcode /> },
    { title: "CodeChef", count: 1200, suffix: "+", icon: <SiCodechef /> }
];

export const projects = [
    {
        id: 1,
        title: "Codolio Portfolio",
        description: "My developer profile showcasing coding achievements and statistics across platforms.",
        link: "https://codolio.com/profile/suyash_545412",
        tags: ["React", "API Integration", "Profile"],
        image: null
    },
    {
        id: 2,
        title: "Portfolio Website",
        description: "A modern, responsive portfolio built with React and Tailwind CSS featuring glassmorphism design.",
        link: "#",
        tags: ["React", "Tailwind CSS", "Framer Motion"],
        image: null
    },
    {
        id: 3,
        title: "Algorithm Visualizer",
        description: "Interactive visualization of sorting and pathfinding algorithms to understand DSA concepts.",
        link: "#",
        tags: ["Java", "Swing", "Algorithms"],
        image: null
    },
];

export const certifications = [
    {
        title: "Data Structure and Backend with Java",
        issuer: "TechnoHacks",
        date: "2024"
    },
    {
        title: "Introduction to Cloud Security",
        issuer: "CyberSecurity Org",
        date: "2024"
    },
];
