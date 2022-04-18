/* eslint-disable react/require-default-props */
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/auth';

interface ProtectedRouterProps {
  redirectPath?: string;
  children: JSX.Element;
  path: string;
}
const ProtectedRoute = ({
  redirectPath = '/',
  children,
  path,
}: ProtectedRouterProps): JSX.Element => {
  const { token, user } = useAuth();
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  if (user.role !== 'PARTICIPANTE' && path === 'participant') {
    if (user.role === 'ADMIN') return <Navigate to="/admin/home" replace />;

    return <Navigate to="/producer/home" replace />;
  }

  if (user.role !== 'PRODUTOR' && path === 'producer') {
    if (user.role === 'PARTICIPANTE')
      return <Navigate to="/participant/home" replace />;

    return <Navigate to="admin/home" replace />;
  }

  if (user.role !== 'ADMIN' && path === 'admin') {
    if (user.role === 'PARTICIPANTE')
      return <Navigate to="participant/home" replace />;

    return <Navigate to="producer/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
