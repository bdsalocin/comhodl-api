import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import * as authService from '../utils/auth';
import { User } from '../utils/auth';

// Interface pour le contexte d'authentification
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  hasCompletedQuestionnaire: boolean;
  setIsAuthenticated: (value: boolean) => void;
  setHasCompletedQuestionnaire: (value: boolean) => void;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

// Valeurs par défaut du contexte
const defaultAuthContext: AuthContextType = {
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  hasCompletedQuestionnaire: false,
  setIsAuthenticated: () => {},
  setHasCompletedQuestionnaire: () => {},
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => {},
  clearError: () => {}
};

// Création du contexte
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Hook pour utiliser le contexte d'authentification
export const useAuth = (): AuthContextType => useContext(AuthContext);

// Props du fournisseur d'authentification
interface AuthProviderProps {
  children: ReactNode;
}

// Fournisseur d'authentification
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasCompletedQuestionnaire, setHasCompletedQuestionnaire] = useState<boolean>(false);

  // Vérifier l'état d'authentification au démarrage
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const storedUser = await authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
          const hasCompleted = await authService.hasCompletedQuestionnaire(storedUser.id);
          setHasCompletedQuestionnaire(hasCompleted);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'état d\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Fonction de connexion
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simuler une requête d'authentification
      const result = await authService.signIn(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } else {
        setError('Identifiants invalides');
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      setError('Une erreur est survenue lors de la connexion');
      setIsLoading(false);
      return false;
    }
  };

  // Fonction d'inscription
  const signUp = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const result = await authService.signUp(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else if (result.error) {
        setError(authService.getErrorMessage(result.error.code));
      }
      
      return false;
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fonction de déconnexion
  const signOut = async () => {
    try {
      setIsLoading(true);
      await authService.signOut();
      setUser(null);
      setIsAuthenticated(false);
      setHasCompletedQuestionnaire(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour effacer l'erreur
  const clearError = () => setError(null);

  // Valeur du contexte
  const value = useMemo(() => ({
    user,
    isLoading,
    error,
    isAuthenticated,
    hasCompletedQuestionnaire,
    setIsAuthenticated,
    setHasCompletedQuestionnaire,
    signIn,
    signUp,
    signOut,
    clearError
  }), [
    user,
    isLoading,
    error,
    isAuthenticated,
    hasCompletedQuestionnaire,
    setIsAuthenticated,
    setHasCompletedQuestionnaire,
    signIn,
    signUp,
    signOut,
    clearError
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 