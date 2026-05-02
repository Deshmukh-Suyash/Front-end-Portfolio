import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const links = [
        { id: 1, link: "about", name: "About" },
        { id: 2, link: "skills", name: "Skills" },
        { id: 3, link: "education", name: "Education" },
        { id: 4, link: "projects", name: "Projects" },
        { id: 5, link: "contact", name: "Contact" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "glass bg-opacity-80 py-2" : "bg-transparent py-4"
                }`}
        >
            <div className="flex justify-between items-center w-full h-16 px-4 md:px-12 text-white">
                <div className="text-3xl font-bold cursor-pointer">
                    <Link to="home" smooth duration={500} className="hover:text-blue-400 transition-colors">
                        Suyash<span className="text-blue-500">.</span>
                    </Link>
                </div>

                <ul className="hidden md:flex gap-8">
                    {links.map(({ id, link, name }) => (
                        <li
                            key={id}
                            className="cursor-pointer capitalize font-medium text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 border-b-2 border-transparent hover:border-blue-500 pb-1"
                        >
                            <Link to={link} smooth duration={500} offset={-70} activeClass="active-link" spy={true}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div onClick={() => setNav(!nav)} className="cursor-pointer pr-4 z-10 text-gray-300 md:hidden hover:text-white">
                    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>
            </div>

            <AnimatePresence>
                {nav && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-gray-900 to-black text-gray-300 flex flex-col justify-center items-center md:hidden backdrop-blur-md"
                    >
                        <ul className="flex flex-col gap-8 text-center">
                            {links.map(({ id, link, name }) => (
                                <li key={id} className="text-4xl cursor-pointer capitalize hover:text-blue-500 transition-all font-light tracking-wide">
                                    <Link onClick={() => setNav(false)} to={link} smooth duration={500} offset={-70}>
                                        {name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
