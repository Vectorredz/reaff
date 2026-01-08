import { useEffect } from 'react'
import { UserAuth } from './context/AuthContext'
import { Navigate } from 'react-router'
import { toast } from 'react-toastify'

const PrivateRoute = ({ children }) => {
  const { session, initialized } = UserAuth();

  // show loading ONLY during the auth gap
  useEffect(() => {
    if (!initialized) {
      toast.loading('loading...', { toastId: 'auth' });
    } else {
      toast.dismiss('auth');
    }
  }, [initialized]);

  // block redirect while auth is unresolved
  if (!initialized) {
    return <p>loading</p>;
  }

  // auth resolved → now it’s safe to redirect
  return session ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
