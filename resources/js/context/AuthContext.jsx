// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/me");
                setUser(response.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Tambahkan fungsi login
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    // Tambahkan fungsi logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                role: user?.role,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
