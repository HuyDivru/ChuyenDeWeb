import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [token,setToken] = useState(null);


    const login = (userInfo,authToken) => {
        setUser(userInfo);
        setToken(authToken);
        localStorage.setItem('token',authToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <UserContext.Provider value={{ user,token, login, logout}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
