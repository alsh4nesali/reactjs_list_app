import React, { createContext, useContext, useState } from "react";

// Define the context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Check localStorage for previous login status
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });



  const login = () => {
    setIsAuthenticated(true);
    localStorage.getItem('userId');
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
