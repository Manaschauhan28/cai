import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  total_sessions: number;
}

interface AuthData {
  user: User;
  session_id: string;
}

interface AuthContextType {
  user: User | null;
  sessionId: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedSessionId = localStorage.getItem("sessionId");
    const token = localStorage.getItem("authToken");

    console.log("Debug - Checking localStorage on mount:", {
      storedUser,
      storedSessionId,
      token,
    });

    if (storedUser && storedSessionId && token) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Debug - Restoring auth state:", {
          user: parsedUser,
          sessionId: storedSessionId,
        });
        setUser(parsedUser);
        setSessionId(storedSessionId);
      } catch (e) {
        console.log("Debug - Error parsing stored user:", e);
        localStorage.removeItem("user");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("authToken");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cigpt.ca/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      console.log("Debug - Login response:", data);

      if (response.ok && data.success) {
        const { user: userData, session_id } = data.data;
        console.log("Debug - Extracted session_id:", session_id);
        console.log("Debug - Extracted user:", userData);

        setUser(userData);
        setSessionId(session_id);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("sessionId", session_id);
        localStorage.setItem("authToken", session_id); // Use session_id as token

        console.log("Debug - Stored in localStorage:", {
          user: localStorage.getItem("user"),
          sessionId: localStorage.getItem("sessionId"),
        });

        setIsLoading(false);
        return true;
      } else {
        setError(
          data.message || "Login failed. Please check your credentials.",
        );
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
      return false;
    }
  };

  const signup = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cigpt.ca/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        // Auto-login after successful signup
        const { user: userData, session_id } = data.data;
        setUser(userData);
        setSessionId(session_id);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("sessionId", session_id);
        localStorage.setItem("authToken", session_id);
        setIsLoading(false);
        return true;
      } else {
        setError(data.message || "Signup failed. Please try again.");
        setIsLoading(false);
        return false;
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setSessionId(null);
    localStorage.removeItem("user");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("authToken");
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    sessionId,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
