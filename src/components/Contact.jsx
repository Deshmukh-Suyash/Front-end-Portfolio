import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone } from "react-icons/fa";

const Contact = () => {
    const formRef = useRef();
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus("Sending...");

        emailjs.sendForm(
            'service_kx6qn4e',
            'template_0737wo8',
            formRef.current,
            'p2_fw1khnEqhKOl-G'
        )
            .then((result) => {
                console.log(result.text);
                setStatus("Message Sent Successfully!");
                setLoading(false);
                e.target.reset();
            }, (error) => {
                console.log(error.text);
                setStatus("Failed to send. Please try again or email directly.");
                setLoading(false);
            });
    };

    return (
        <div
            name="contact"
            className="w-full h-auto bg-gradient-to-b from-black to-gray-800 p-4 text-white"
        >
            <div className="flex flex-col p-4 justify-center max-w-screen-lg mx-auto h-full">
                <div className="pb-8">
                    <p className="text-4xl font-bold inline border-b-4 border-gray-500">Contact</p>
                    <p className="py-6 text-xl text-gray-400">Submit the form below to get in touch with me</p>
                </div>

                <div className="flex justify-center items-center flex-col md:flex-row gap-10">
                    <div className="flex flex-col gap-8 w-full md:w-1/2">
                        <div className="glass p-6 rounded-lg flex items-center gap-4 hover:scale-105 duration-300">
                            <FaEnvelope size={30} className="text-blue-500" />
                            <div>
                                <h3 className="text-xl font-bold">Email</h3>
                                <p className="text-gray-400">deshmukhsuyash96@gamil.com</p>
                            </div>
                        </div>
                        <div className="glass p-6 rounded-lg flex items-center gap-4 hover:scale-105 duration-300">
                            <FaPhone size={30} className="text-green-500" />
                            <div>
                                <h3 className="text-xl font-bold">Phone</h3>
                                <p className="text-gray-400">+91-8815936977</p>
                            </div>
                        </div>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col w-full md:w-1/2 gap-4">
                        <input
                            type="text"
                            name="user_name"
                            placeholder="Enter your name"
                            className="p-4 bg-transparent border-2 border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Enter your email"
                            className="p-4 bg-transparent border-2 border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        />
                        <textarea
                            name="message"
                            rows="10"
                            placeholder="Enter your message"
                            className="p-4 bg-transparent border-2 border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500 transition-colors"
                            required
                        ></textarea>

                        <button disabled={loading} className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300 shadow-lg shadow-blue-500/50 font-bold disabled:opacity-50">
                            {loading ? "Sending..." : "Let's Talk"}
                        </button>

                        {status && (
                            <p className={`text-center font-bold ${status.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
                                {status}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
