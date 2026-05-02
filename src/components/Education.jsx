import React from "react";
import { education } from "../data/portfolioData";

const Education = () => {
    return (
        <div
            name="education"
            className="w-full h-auto bg-gradient-to-b from-gray-800 to-black text-white p-8"
        >
            <div className="max-w-screen-lg mx-auto flex flex-col justify-center w-full h-full">
                <div className="pb-8">
                    <h2 className="text-4xl font-bold inline border-b-4 border-gray-500">
                        Education
                    </h2>
                </div>

                <div className="relative border-l border-gray-200 dark:border-gray-700 ml-3">
                    {education.map((item, index) => (
                        <div key={index} className="mb-10 ml-6 group">
                            <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900 group-hover:bg-blue-500 transition-colors duration-300">
                                <svg aria-hidden="true" className="w-3 h-3 text-blue-800 dark:text-blue-300 group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                            </span>
                            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 transform hover:scale-105 transition-transform duration-300 glass hover:bg-gray-700">
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{item.institution}</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{item.year}</time>
                                <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{item.degree} - {item.details}</p>
                                <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{item.score}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
