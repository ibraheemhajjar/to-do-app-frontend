import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {

  const isLoggedIn = useSelector(
		(state: RootState) => state.user.isLoggedIn
	);

  return isLoggedIn ? <>{children}</> : <Navigate to="/" replace />;
}

export default PrivateRoute;
