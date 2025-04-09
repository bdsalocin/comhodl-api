import { ApiService } from './api.service';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api.config';

export interface UserRegistrationData {
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  mot_de_passe: string;
  sexe: 'M' | 'F' | 'Autre';
  age?: number;
  date_naissance?: Date;
  adresse?: string;
  commune?: string;
  departement?: string;
  pays?: string;
  numero_telephone?: string;
  situation_familiale?: 'Célibataire' | 'Couple' | 'Famille';
  avec_enfants?: boolean;
  age_enfants?: string;
  preferences_activites?: ('Resto' | 'Shopping' | 'Culture')[];
}

export class AuthService {
  static async registerUser(userData: UserRegistrationData) {
    try {
      // Hasher le mot de passe avec expo-crypto
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        userData.mot_de_passe
      );

      // Envoyer les données à l'API
      const response = await ApiService.post('/auth/register', {
        ...userData,
        mot_de_passe: hashedPassword
      });

      return response;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }

  static async loginUser(email: string, password: string) {
    try {
      // Hasher le mot de passe
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      // Envoyer les données à l'API
      const response = await ApiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        mot_de_passe: hashedPassword
      });

      if (response.token) {
        await AsyncStorage.setItem('auth_token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  static async logout() {
    try {
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      throw error;
    }
  }
} 