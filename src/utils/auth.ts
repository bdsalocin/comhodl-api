import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Clé pour le stockage du token
const AUTH_TOKEN_KEY = 'auth_token';

// Interface pour un utilisateur simulé
export interface User {
  id: string;
  email: string;
}

// Interface pour les erreurs d'authentification
export interface AuthError {
  code: string;
  message: string;
}

// Interface pour les résultats d'authentification
export interface AuthResult {
  success: boolean;
  user?: User;
  error?: AuthError;
}

// Utilisateurs simulés pour le développement
const mockUsers: Record<string, User> = {
  'test@example.com': {
    id: '1',
    email: 'test@example.com',
  }
};

// Mots de passe hachés simulés (en production, utiliser bcrypt ou argon2)
const mockPasswordHashes: Record<string, string> = {
  'test@example.com': 'simulated_hash_for_password123'
};

// Fonction simulant un hachage sécurisé
const simulatePasswordHash = (password: string): string => {
  // En production, utilisez une vraie fonction de hachage comme bcrypt
  return 'simulated_hash_for_' + password;
};

// Fonction simulant la vérification d'un mot de passe
const simulatePasswordVerify = (password: string, hash: string): boolean => {
  // En production, utilisez la fonction de vérification correspondante à votre algorithme de hachage
  return hash === simulatePasswordHash(password);
};

// Utilisateur actuellement connecté
let currentUser: User | null = null;

const USER_STORAGE_KEY = '@user';
const QUESTIONNAIRE_STORAGE_KEY = '@questionnaire_completed';

export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userJson = await AsyncStorage.getItem(USER_STORAGE_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    return null;
  }
};

export const hasCompletedQuestionnaire = async (userId: string): Promise<boolean> => {
  try {
    const completed = await AsyncStorage.getItem(`${QUESTIONNAIRE_STORAGE_KEY}_${userId}`);
    return completed === 'true';
  } catch (error) {
    console.error('Erreur lors de la vérification du questionnaire:', error);
    return false;
  }
};

export const setQuestionnaireCompleted = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(`${QUESTIONNAIRE_STORAGE_KEY}_${userId}`, 'true');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du questionnaire:', error);
  }
};

/**
 * Connexion avec email et mot de passe
 */
export const signIn = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // Simuler une requête d'authentification
    if (email && password) {
      const user = { id: '1', email };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: { code: 'auth/invalid-credentials', message: 'Identifiants invalides' } };
  } catch (error) {
    return { success: false, error: { code: 'auth/unknown', message: 'Une erreur est survenue' } };
  }
};

/**
 * Inscription avec email et mot de passe
 */
export const signUp = async (email: string, password: string): Promise<AuthResult> => {
  try {
    // Simuler une requête d'inscription
    if (email && password) {
      const user = { id: '1', email };
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: { code: 'auth/invalid-credentials', message: 'Identifiants invalides' } };
  } catch (error) {
    return { success: false, error: { code: 'auth/unknown', message: 'Une erreur est survenue' } };
  }
};

/**
 * Déconnexion
 */
export const signOut = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};

/**
 * Vérifier si l'utilisateur est authentifié
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
    return !!token;
  } catch (error) {
    return false;
  }
};

/**
 * Récupérer l'utilisateur actuel
 */
export const getCurrentUser = (): User | null => {
  return currentUser;
};

/**
 * Traduire les codes d'erreur en messages compréhensibles
 */
export const getErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/invalid-credentials':
      return 'Identifiants invalides';
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé';
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible';
    default:
      return 'Une erreur est survenue';
  }
}; 