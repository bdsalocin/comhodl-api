import { Linking, Platform, Alert } from 'react-native';
import { Place } from '../data/places';

// Fonction utilitaire pour calculer la distance en km entre deux points géographiques
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Rayon de la terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance en km
  return Math.round(distance * 10) / 10; // Arrondi à 1 décimale
};

// Fonction pour ouvrir l'application GPS et naviguer vers un lieu
export const openGPS = (place: Place) => {
  const { latitude, longitude } = place.coordinate;
  const destLatLng = `${latitude},${longitude}`;
  
  // URL directe pour iOS ou Android
  const url = Platform.OS === 'ios'
    ? `http://maps.apple.com/?daddr=${destLatLng}&dirflg=d`
    : `google.navigation:q=${destLatLng}`;
    
  // Ouvrir directement sans promesses ni délais
  Linking.openURL(url).catch(() => {
    // Fallback sur Google Maps Web en cas d'échec
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${destLatLng}`);
  });
}; 