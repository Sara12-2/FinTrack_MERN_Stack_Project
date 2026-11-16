import { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // MOCK LOGIN (Backend ke bina)
  const login = async (email, password) => {
    // Fake loading delay taake spinner dikhe
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    const fakeUser = { ...mockUser, email };
    localStorage.setItem('token', 'fake-jwt-token-123');
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  // MOCK REGISTER (Backend ke bina)
  const register = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const fakeUser = { ...mockUser, name, email };
    localStorage.setItem('token', 'fake-jwt-token-123');
    localStorage.setItem('user', JSON.stringify(fakeUser));
    setUser(fakeUser);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);