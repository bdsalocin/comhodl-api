import * as Location from 'expo-location';
import { LocationObject, LocationObjectCoords, LocationAccuracy } from 'expo-location';

export interface LocationError {
  code?: string;
  message: string;
}

export interface LocationResult {
  success: boolean;
  location?: LocationObject;
  error?: LocationError;
}

/**
 * Demande la permission d'accès à la localisation
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Erreur lors de la demande de permission de localisation:', error);
    return false;
  }
};

/**
 * Vérifie si la permission de localisation est accordée
 */
export const checkLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Erreur lors de la vérification de la permission de localisation:', error);
    return false;
  }
};

/**
 * Récupère la position actuelle de l'utilisateur
 */
export const getCurrentLocation = async (): Promise<LocationResult> => {
  try {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      return { 
        success: false, 
        error: { 
          code: 'PERMISSION_DENIED',
          message: 'Permission de localisation non accordée' 
        }
      };
    }
    
    const location = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.Balanced
    });
    
    return { success: true, location };
  } catch (error: any) {
    return { 
      success: false, 
      error: { 
        code: error.code || 'LOCATION_ERROR',
        message: error.message || 'Erreur lors de la récupération de la position' 
      }
    };
  }
};

/**
 * Récupère les coordonnées par défaut si la localisation n'est pas disponible
 */
export const getDefaultLocation = (): LocationObjectCoords => {
  // Coordonnées par défaut (Paris, France)
  return {
    latitude: 48.856614,
    longitude: 2.3522219,
    altitude: null,
    accuracy: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null
  };
};

/**
 * Suit les changements de position de l'utilisateur
 */
export const watchLocation = async (
  onLocationUpdate: (location: LocationObject) => void,
  onError: (error: LocationError) => void
): Promise<Location.LocationSubscription> => {
  const hasPermission = await requestLocationPermission();
  
  if (!hasPermission) {
    onError({ 
      code: 'PERMISSION_DENIED',
      message: 'Permission de localisation non accordée' 
    });
  }
  
  return Location.watchPositionAsync(
    { 
      accuracy: LocationAccuracy.Balanced,
      distanceInterval: 10, // Mise à jour tous les 10 mètres
      timeInterval: 5000 // Ou toutes les 5 secondes
    },
    (location) => {
      onLocationUpdate(location);
    }
  );
}; 