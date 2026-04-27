"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
    id: number;
    phone: string;
    fullName: string;
    region: string;
    city: string;
    role: string;
    active: boolean;
}

interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("autocrmtoken");
        window.location.href = "/login"
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};

// custom hook
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used inside UserProvider");
    }
    return context;
};