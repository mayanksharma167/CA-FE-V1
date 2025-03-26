import React, { useContext } from "react";
import { ThemeContext } from "../../../context/themeContext";

// Information Card Component
export const InformationCard = ({ title, description }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div 
            className={`
                p-4 
                rounded-lg 
                shadow-md 
                transition-all 
                duration-300 
                ${theme === "light" 
                    ? "bg-white/80 text-gray-800 border border-gray-200" 
                    : "bg-gray-800/80 text-gray-100 border border-emerald-500/20"
                }
            `}
        >
            <h3 className="font-bold text-lg mb-2 text-emerald-600">{title}</h3>
            <p className="text-sm opacity-80">{description}</p>
        </div>
    );
};

// Message Card Component
export const MessageCard = ({ message }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <div 
            className={`
                p-4 
                rounded-lg 
                shadow-md 
                transition-all 
                duration-300 
                ${theme === "light" 
                    ? "bg-white/80 text-gray-800 border border-gray-200" 
                    : "bg-gray-800/80 text-gray-100 border border-emerald-500/20"
                }
            `}
        >
            <p className="text-sm italic opacity-90">{message}</p>
        </div>
    );
};