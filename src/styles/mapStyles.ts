import { StyleSheet } from 'react-native';
import { MapStyleElement } from 'react-native-maps';

// Styles de base pour l'écran de carte
export const mapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Style personnalisé pour la carte Google Maps
export const googleMapStyle: MapStyleElement[] = [
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]; 