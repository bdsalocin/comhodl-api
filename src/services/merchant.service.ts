import { ApiService } from './api.service';
import { Commercant, QRCode, Defi, Lot } from '../types/database.types';

export class MerchantService {
  static async getMerchants(): Promise<Commercant[]> {
    return await ApiService.get('/merchants');
  }

  static async getMerchantById(id: number): Promise<Commercant> {
    return await ApiService.get(`/merchants/${id}`);
  }

  static async getMerchantQRCodes(id: number): Promise<QRCode[]> {
    return await ApiService.get(`/merchants/${id}/qr-codes`);
  }

  static async getMerchantDefis(id: number): Promise<Defi[]> {
    return await ApiService.get(`/merchants/${id}/defis`);
  }

  static async getMerchantLots(id: number): Promise<Lot[]> {
    return await ApiService.get(`/merchants/${id}/lots`);
  }

  static async searchMerchants(query: string): Promise<Commercant[]> {
    return await ApiService.get(`/merchants/search?q=${encodeURIComponent(query)}`);
  }

  static async getMerchantsByActivity(activity: string): Promise<Commercant[]> {
    return await ApiService.get(`/merchants/activity/${encodeURIComponent(activity)}`);
  }

  static async getNearbyMerchants(latitude: number, longitude: number, radius: number): Promise<Commercant[]> {
    return await ApiService.get(`/merchants/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`);
  }
} 