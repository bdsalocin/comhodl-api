import { ApiService } from './api.service';
import { Defi, QRCode } from '../types/database.types';

export class ChallengeService {
  static async scanQRCode(qrCode: string): Promise<{
    points_gagnes: number;
    message: string;
  }> {
    return await ApiService.post('/challenges/scan', { qrCode });
  }

  static async getActiveDefis(): Promise<Defi[]> {
    return await ApiService.get('/challenges/defis/active');
  }

  static async getDefiById(id: number): Promise<Defi> {
    return await ApiService.get(`/challenges/defis/${id}`);
  }

  static async completeDefi(id: number): Promise<{
    points_gagnes: number;
    message: string;
  }> {
    return await ApiService.post(`/challenges/defis/${id}/complete`, {});
  }

  static async startParcours(merchantIds: number[]): Promise<{
    idp: number;
    message: string;
  }> {
    return await ApiService.post('/challenges/parcours/start', { merchantIds });
  }

  static async completeParcours(idp: number): Promise<{
    points_gagnes: number;
    message: string;
  }> {
    return await ApiService.post(`/challenges/parcours/${idp}/complete`, {});
  }

  static async getActiveParcours(): Promise<any[]> {
    return await ApiService.get('/challenges/parcours/active');
  }
} 