import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
    token: string | null;
    login: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    user: User | null;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
interface User {
    email: string;
    admin: boolean;
    fullname: string;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            const storedUser = await AsyncStorage.getItem('token');
            setToken(storedToken);
            setUser(storedUser ? JSON.parse(storedUser) : null);
            setLoading(false);
        };
        loadToken();
    }, []);

    const login = async (newToken: string, user: User) => {
        console.log(user);
        await AsyncStorage.setItem('token', newToken);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setToken(newToken);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
