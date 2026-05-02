import React, { useContext } from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SiCodechef, SiLeetcode } from "react-icons/si";
import { personalInfo } from "../data/portfolioData";
import { AdminContext } from "../context/AdminContext";
const Footer = () => {
    const { isAdmin, login, logout } = useContext(AdminContext);

    const handleAdminToggle = () => {
        if (isAdmin) {
            if (window.confirm("Logout from admin mode?")) logout();
        } else {
            const pwd = window.prompt("Enter Admin Password:");
            if (pwd) login(pwd);
        }
    };

    return (
        <div className="w-full bg-black text-gray-300 py-8 border-t border-gray-800 text-center">
            <div className="flex flex-col max-w-screen-lg mx-auto items-center justify-center">
                <div className="flex gap-8 mb-4">
                    <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-500 duration-300"><FaLinkedin size={30} /></a>
                    <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="hover:text-white duration-300"><FaGithub size={30} /></a>
                    <a href={personalInfo.socials.leetcode} target="_blank" rel="noreferrer" className="hover:text-yellow-500 duration-300"><SiLeetcode size={30} /></a>
                    <a href={personalInfo.socials.codechef} target="_blank" rel="noreferrer" className="hover:text-orange-500 duration-300"><SiCodechef size={30} /></a>
                </div>
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} <span onClick={handleAdminToggle} className="cursor-pointer hover:text-white transition-colors">Suyash Deshmukh</span>. All rights reserved. {isAdmin && <span className="text-green-500 text-xs ml-2">(Admin Mode)</span>}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                    Designed with <span className="text-red-500">&hearts;</span> using React & Tailwind CSS
                </p>
            </div>
        </div>
    );
};

export default Footer;
