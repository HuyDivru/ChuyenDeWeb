import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, []);

    const login = (userInfo, authToken) => {
        setUser(userInfo);
        setToken(authToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
        localStorage.setItem('token', authToken);
    };

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const savedToken = localStorage.getItem('token');
        if (savedUser && savedToken) {
            setUser(savedUser);
            setToken(savedToken);
        }

        let inactivityTimer = setTimeout(() => {
            logout();
            window.location.reload();
        }, 5 * 60 * 1000);

        const resetTimeout = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                logout();
                window.location.reload();
            }, 5 * 60 * 1000);
        };

        window.addEventListener('mousemove', resetTimeout);
        window.addEventListener('keydown', resetTimeout);
        window.addEventListener('scroll', resetTimeout);

        return () => {
            clearTimeout(inactivityTimer);
            window.removeEventListener('mousemove', resetTimeout);
            window.removeEventListener('keydown', resetTimeout);
            window.removeEventListener('scroll', resetTimeout);
        };
    }, [logout]);

    return (
        <UserContext.Provider value={{ user, token, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
