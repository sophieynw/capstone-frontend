import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from './AuthContext';
import { User } from '@/types/entityTypes';

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore login when app starts
  useEffect(() => {
    restoreSession();
  }, []);

  const restoreSession = async () => {
    try {
      const savedToken = await SecureStore.getItemAsync('token');

      const savedUser = await SecureStore.getItemAsync('user');

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.log('Failed restoring session', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string, user: User) => {
    setToken(token);
    setUser(user);

    await SecureStore.setItemAsync('token', token);
    await SecureStore.setItemAsync('user', JSON.stringify(user));
  };

  const logout = async () => {
    setToken(null);
    setUser(null);

    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('user');
  };

  const update = async (updatedUser: User) => {
    setUser(updatedUser);
    await SecureStore.setItemAsync('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoading,
        login,
        logout,
        update,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
