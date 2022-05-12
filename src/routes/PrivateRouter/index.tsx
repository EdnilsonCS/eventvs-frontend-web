/* eslint-disable react/require-default-props */
import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/hooks/auth';

interface ProtectedRouterProps {
  redirectPath?: string;
  children: JSX.Element;
  path?: string;
  isPublic?: boolean;
}
const ProtectedRoute = ({
  redirectPath = '/',
  children,
  path,
  isPublic,
}: ProtectedRouterProps): JSX.Element => {
  const { token, user } = useAuth();
  if (!token && path !== '/' && !isPublic) {
    return <Navigate to={redirectPath} replace />;
  }

  if (path === '/') {
    if (user.role === 'ADMINISTRADOR')
      return <Navigate to="/admin/home" replace />;

    if (user.role === 'PARTICIPANTE')
      return <Navigate to="/participant/home" replace />;

    if (user.role === 'PARTICIPANTE')
      return <Navigate to="/participant/home" replace />;
  }

  if (user.role !== 'PARTICIPANTE' && path === 'participant') {
    if (user.role === 'ADMINISTRADOR')
      return <Navigate to="/admin/home" replace />;

    return <Navigate to="/producer/home" replace />;
  }

  if (user.role !== 'PRODUTOR' && path === 'producer') {
    if (user.role === 'PARTICIPANTE')
      return <Navigate to="/participant/home" replace />;

    return <Navigate to="admin/home" replace />;
  }

  if (user.role !== 'ADMINISTRADOR' && path === 'admin') {
    if (user.role === 'PARTICIPANTE')
      return <Navigate to="participant/home" replace />;

    return <Navigate to="producer/home" replace />;
  }

  return children;
};

export default ProtectedRoute;
