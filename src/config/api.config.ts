import { Platform } from 'react-native';

// Configuration de l'API
export const API_CONFIG = {
  // URL de base de l'API
  BASE_URL: process.env.API_URL || 'https://votre-domaine-ovh.net/api',
  
  // Timeout des requêtes (en millisecondes)
  TIMEOUT: 10000,
  
  // Nombre maximum de tentatives de reconnexion
  MAX_RETRIES: 3,
  
  // Délai entre les tentatives (en millisecondes)
  RETRY_DELAY: 1000,
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Endpoints d'authentification
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      LOGOUT: '/api/auth/logout',
    },
    USER: {
      PROFILE: '/api/user/profile',
      UPDATE: '/api/user/update',
    },
  },
  
  // Configuration de sécurité
  SECURITY: {
    // Durée de validité du token (en secondes)
    TOKEN_EXPIRATION: 3600,
    
    // Durée de validité du refresh token (en secondes)
    REFRESH_TOKEN_EXPIRATION: 604800, // 7 jours
    
    // Nombre maximum de tentatives de connexion avant blocage
    MAX_LOGIN_ATTEMPTS: 5,
    
    // Durée du blocage après dépassement des tentatives (en secondes)
    LOCKOUT_DURATION: 900, // 15 minutes
  },
  
  JWT_SECRET: process.env.JWT_SECRET || 'votre_secret_jwt',
}; 