import { useEffect, useRef, useCallback } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useUserContext } from '../context/UserContext';
import axiosInstance from '../utils/axios';
import { useDropzone } from 'react-dropzone';

const UserSyncHandler = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { updateUserData, setLoading, setErrorState, loadUserCredits } = useUserContext();

  const syncInProgress = useRef(false);

  const syncUserWithBackend = useCallback(async () => {
    if (!user || syncInProgress.current) {
      return;
    }

    setLoading(true);
    syncInProgress.current = true;

    try {
      const token = await getToken();
      if (!token) throw new Error('Authentication token not available.');

      const userData = {
        clerkId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        photoUrl: user.imageUrl
      };

      const response = await axiosInstance.post('/users', userData, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.data && response.data.data) {
        updateUserData(response.data.data);
        await loadUserCredits();
        setErrorState(null);
      } else {
        throw new Error('User data not found in the backend response.');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to sync user.';
      setErrorState(errorMessage);
    } finally {
      setLoading(false);
      syncInProgress.current = false;
    }
  }, [user, getToken, setLoading, updateUserData, setErrorState, loadUserCredits]);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setLoading(false);
      updateUserData(null);
    }

    if (isLoaded && isSignedIn && user) {
      syncUserWithBackend();
    }
  }, [isLoaded, isSignedIn, user, syncUserWithBackend, setLoading, updateUserData]);

  return null;
};

export default UserSyncHandler; 