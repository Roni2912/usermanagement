import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { token, loading, error } = useSelector((state) => state.auth);
  return {
    isAuthenticated: !!token,
    loading,
    error,
  };
};