import { createContext, useContext, useState } from "react";

const GlobalUserContext = createContext();

export const GlobalUserStateProvider = ({ children }) => {
    const [globalUser, setGlobalUser] = useState(null);

    return (
        <GlobalUserContext.Provider value={{ globalUser, setGlobalUser }}>
            {children}
        </GlobalUserContext.Provider>
    );
};

export const useGlobalState = () => {
    const context = useContext(GlobalUserContext);
    if (!context) {
        throw new Error(
            "useGlobalState must be used within a GlobalUserStateProvider"
        );
    }
    return context; // Return an object, not an array
};
