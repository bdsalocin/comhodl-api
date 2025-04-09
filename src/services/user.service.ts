import { ApiService } from './api.service';
import { Utilisateur } from '../types/database.types';

export class UserService {
  static async getCurrentUser(): Promise<Utilisateur> {
    return await ApiService.get('/users/me');
  }

  static async updateProfile(userData: Partial<Utilisateur>): Promise<Utilisateur> {
    return await ApiService.post('/users/profile', userData);
  }

  static async getPoints(): Promise<number> {
    const user = await this.getCurrentUser();
    return user.points_disponibles;
  }

  static async updatePreferences(preferences: string[]): Promise<Utilisateur> {
    return await ApiService.post('/users/preferences', { preferences_activites: preferences });
  }

  static async getDefisRealises(): Promise<any[]> {
    return await ApiService.get('/users/defis');
  }

  static async getQRScannes(): Promise<any[]> {
    return await ApiService.get('/users/qr-scans');
  }

  static async getParcours(): Promise<any[]> {
    return await ApiService.get('/users/parcours');
  }
} 