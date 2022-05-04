import React, {useEffect, useState, createContext, useCallback} from 'react';
import Session from '../services/session';
import User from '../services/user';
interface AuthContextData {
  user: any;
  isAuthenticated: boolean;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<object | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const userExist = await User.get();

      if (Object.keys(userExist).length > 0 && userExist.remember) {
        setUser(userExist);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async (email: string, pass: string) => {
    try {
      await Session.authorization(email, pass);
      setIsAuthenticated(true);
    } catch (e: any) {
      setIsAuthenticated(false);
      throw new Error(e.message);
    }
  }, []);

  const signOut = useCallback(async () => {
    User.remove();
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: user || {},
        isAuthenticated,
        signOut,
        signIn,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
