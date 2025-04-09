// Type pour représenter un commerce
export interface Store {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  openingHours: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  visited: boolean;
} 