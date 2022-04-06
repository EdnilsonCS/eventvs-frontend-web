/* eslint-disable consistent-return */
import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { useMemo } from 'react';
import { toast } from 'react-toastify';
import Api from '../services/api';
import AuthService from '../services/AuthService';

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | Record<string, string>;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState({ token: '', user: {} });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const user = await localStorage.getItem('@Events:user');

      const token = await localStorage.getItem('@Events:token');

      if (token && user) {
        Api.defaults.headers.common.authorization = `Bearer ${token}`;
        setData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await AuthService.signIn({ email, password });

      const { access_token: token, refresh_token } = response.data;
      const user = {
        id: response.data.pessoa_id,
        email: response.data.email,
        name: response.data.nome,
        role: response.data.role,
      };

      await localStorage.setItem('@Events:refresh_token', refresh_token);
      await localStorage.setItem('@Events:token', token);

      await localStorage.setItem('@Events:user', JSON.stringify(user));
      Api.defaults.headers.common.authorization = `Bearer ${token}`;
      setData({
        token,
        user,
      });
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.error_description, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('verifique sua conexão com a internet', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      throw new Error(err);
    }
  }, []);

  const signOut = useCallback(async () => {
    await localStorage.removeItem('@Events:refresh_token');
    await localStorage.removeItem('@Events:token');

    await localStorage.removeItem('@Events:user');

    setData({ token: '', user: {} });
  }, []);

  const AuthProviderValue = useMemo(() => {
    return { user: data.user, token: data.token, loading, signIn, signOut };
  }, [data.token, data.user, loading, signIn, signOut]);

  return (
    <AuthContext.Provider value={AuthProviderValue}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, AuthContext };
