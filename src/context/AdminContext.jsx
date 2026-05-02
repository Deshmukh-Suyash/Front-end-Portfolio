import React, { createContext, useState, useEffect } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setIsAdmin(true);
            setToken(storedToken);
        }
    }, []);

    const login = (password) => {
        localStorage.setItem("adminToken", password);
        setToken(password);
        setIsAdmin(true);
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setToken("");
        setIsAdmin(false);
    };

    return (
        <AdminContext.Provider value={{ isAdmin, token, login, logout }}>
            {children}
        </AdminContext.Provider>
    );
};
