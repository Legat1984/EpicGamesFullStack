import React, { createContext, useState, useCallback, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(user !== null);

    const handleUnauthenticated = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('activeTab');
        window.location.href = '/';
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
    };

    const logout = () => {
        handleUnauthenticated();
    };

    const refreshToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/refresh-token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                return true;
            } else {
                handleUnauthenticated();
                return false;
            }
        } catch (error) {
            console.error('Ошибка при обновлении токена:', error);
            handleUnauthenticated();
            return false;
        }
    }, [handleUnauthenticated]);

    const checkToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            const fiveMinutesInSeconds = 300;

            if (decodedToken.exp < currentTime) {
                handleUnauthenticated();
                return false;
            } else if ((decodedToken.exp - currentTime) <= fiveMinutesInSeconds) {
                return await refreshToken();
            } else {
                return true;
            }
        }
        return false;
    }, [handleUnauthenticated, refreshToken]);

    useEffect(() => {
        checkToken();

        const interval = setInterval(() => {
            checkToken();
        }, 60000);

        return () => clearInterval(interval);
    }, [checkToken]);

    return (
        <UserContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};