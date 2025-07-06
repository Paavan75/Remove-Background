import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axiosInstance from '../utils/axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  const updateUserData = useCallback((data) => {
    setUserData(data);
    if (data && data.credits !== undefined) {
      setCredits(data.credits);
    }
  }, []);

  const loadUserCredits = useCallback(async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axiosInstance.get('/users/credits', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data && response.data.data && response.data.data.credits !== undefined) {
        setCredits(response.data.data.credits);
      }
    } catch (err) {
      console.error('Failed to load user credits:', err);
    }
  }, [getToken]);

  const setLoading = useCallback((loading) => {
    setIsLoading(loading);
  }, []);

  const setErrorState = useCallback((error) => {
    setError(error);
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        updateUserData,
        credits,
        loadUserCredits,
        isLoading,
        setLoading,
        error,
        setErrorState
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}; 