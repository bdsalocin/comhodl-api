import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import * as locationService from '../utils/location';
import HamburgerMenu from './menu/HamburgerMenu';

interface Commerce {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface CustomMapViewProps {
  initialRegion?: {
    latitude: number;
    longitude: number;
    zoom?: number;
  };
  showUserLocation?: boolean;
  commerces?: Commerce[];
}

const CustomMapView: React.FC<CustomMapViewProps> = ({
  initialRegion,
  showUserLocation = true,
  commerces = [],
}) => {
  const webViewRef = useRef<WebView | null>(null);
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  const defaultRegion = {
    latitude: 48.856614,
    longitude: 2.3522219,
    zoom: 13
  };
  
  const [region, setRegion] = useState(initialRegion || defaultRegion);

  // Récupérer la position de l'utilisateur au démarrage
  useEffect(() => {
    const getUserLocation = async () => {
      // Demander la permission d'accès à la localisation
      const hasPermission = await locationService.requestLocationPermission();
      
      if (!hasPermission) {
        setLocationError('La permission d\'accès à la localisation n\'a pas été accordée.');
        Alert.alert(
          'Permission refusée',
          'L\'application n\'a pas accès à votre position. Certaines fonctionnalités seront limitées.',
          [{ text: 'OK' }]
        );
        return;
      }
      
      try {
        // Récupérer la position actuelle
        const locationResult = await locationService.getCurrentLocation();
        
        if (locationResult.success && locationResult.location) {
          setUserLocation(locationResult.location);
          
          // Mettre à jour la région de la carte avec la position de l'utilisateur
          setRegion({
            latitude: locationResult.location.coords.latitude,
            longitude: locationResult.location.coords.longitude,
            zoom: 15
          });
          
          // Mettre à jour la position sur la carte OpenStreetMap
          updateMapPosition(
            locationResult.location.coords.latitude,
            locationResult.location.coords.longitude,
            15
          );
        } else if (locationResult.error) {
          setLocationError(locationResult.error.message);
        }
      } catch (error: any) {
        setLocationError(error.message || 'Une erreur est survenue lors de la récupération de la position.');
      }
    };

    getUserLocation();
  }, []);

  // Démarrer le suivi de la position si l'utilisateur est localisé
  useEffect(() => {
    if (!showUserLocation || !userLocation) return;

    let locationSubscription: Location.LocationSubscription | null = null;

    const startLocationTracking = async () => {
      locationSubscription = await locationService.watchLocation(
        (location) => {
          setUserLocation(location);
          updateMapPosition(
            location.coords.latitude,
            location.coords.longitude
          );
        },
        (error) => {
          setLocationError(error.message);
        }
      );
    };

    startLocationTracking();

    // Nettoyer l'abonnement à la localisation
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [showUserLocation, userLocation]);

  // Fonction pour mettre à jour la position sur la carte
  const updateMapPosition = (latitude: number, longitude: number, zoom?: number) => {
    if (webViewRef.current) {
      const zoomLevel = zoom || region.zoom || 15;
      webViewRef.current.injectJavaScript(`
        if (window.map) {
          // Seulement si l'utilisateur n'est pas en train d'interagir avec la carte
          if (typeof isUserInteracting === 'undefined' || !isUserInteracting) {
            window.map.setView([${latitude}, ${longitude}], ${zoomLevel}, {
              animate: true,
              duration: 0.5
            });
          }
          
          // Toujours mettre à jour ou créer le marqueur de l'utilisateur
          if (window.userMarker) {
            window.userMarker.setLatLng([${latitude}, ${longitude}]);
          } else {
            window.userMarker = L.marker([${latitude}, ${longitude}], {
              icon: L.divIcon({
                className: 'user-location',
                html: '<div class="user-dot"></div>',
                iconSize: [20, 20]
              })
            }).addTo(window.map);
          }
        }
        true;
      `);
    }
  };

  // Fonction pour centrer la carte sur la position de l'utilisateur
  const centerOnUserLocation = useCallback(() => {
    if (!userLocation || !webViewRef.current) return;

    webViewRef.current.injectJavaScript(`
      if (window.map) {
        // Forcer le recentrage
        window.isUserInteracting = false;
        
        window.map.setView([${userLocation.coords.latitude}, ${userLocation.coords.longitude}], 15, {
          animate: true,
          duration: 0.7
        });
        
        if (window.userMarker) {
          window.userMarker.setLatLng([${userLocation.coords.latitude}, ${userLocation.coords.longitude}]);
        } else {
          window.userMarker = L.marker([${userLocation.coords.latitude}, ${userLocation.coords.longitude}], {
            icon: L.divIcon({
              className: 'user-location',
              html: '<div class="user-dot"></div>',
              iconSize: [20, 20]
            })
          }).addTo(window.map);
        }
      }
      true;
    `);
  }, [userLocation]);

  // Code HTML simple pour une carte basique
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body { 
          margin: 0; 
          padding: 0; 
          height: 100vh;
          width: 100vw;
        }
        #map { 
          height: 100%; 
          width: 100%; 
        }
        .user-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #279AF1;
          border: 3px solid white;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        // Fonction pour créer la carte
        function initMap() {
          // Créer la carte
          var map = L.map('map').setView([${region.latitude}, ${region.longitude}], ${region.zoom || 13});
          
          // Ajouter les tuiles OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);
          
          // Ajouter un marqueur pour la position de l'utilisateur si disponible
          var userMarker;
          ${userLocation ? `
            userMarker = L.marker([${userLocation.coords.latitude}, ${userLocation.coords.longitude}], {
              icon: L.divIcon({
                className: 'user-location',
                html: '<div class="user-dot"></div>',
                iconSize: [20, 20]
              })
            }).addTo(map);
          ` : ''}
          
          // Rendre la carte disponible globalement
          window.map = map;
          window.userMarker = userMarker;
          
          // Notifier que la carte est prête
          window.ReactNativeWebView.postMessage('mapReady');
        }
        
        // Initialiser la carte quand le document est chargé
        document.addEventListener('DOMContentLoaded', initMap);
      </script>
    </body>
    </html>
  `;

  // Gestionnaire des messages de la WebView
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'regionChange') {
        setRegion(data.region);
      }
    } catch (e) {
      // Si les données ne sont pas au format JSON, c'est probablement juste un message texte
      if (event.nativeEvent.data === 'mapReady') {
        console.log('Map is ready');
        
        // Centrer sur la position de l'utilisateur si disponible
        if (userLocation) {
          setTimeout(() => {
            updateMapPosition(
              userLocation.coords.latitude,
              userLocation.coords.longitude,
              15
            );
          }, 500);
        }
      }
    }
  };

  const handleNavigateToCommerce = (commerce: Commerce) => {
    const { latitude, longitude } = commerce.coordinates;
    updateMapPosition(latitude, longitude, 15);
    
    // Envoyer un message au WebView pour mettre à jour la carte
    webViewRef.current?.injectJavaScript(`
      map.setView([${latitude}, ${longitude}], 15);
      true;
    `);
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.map}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={handleWebViewMessage}
        startInLoadingState={true}
      />
      <HamburgerMenu 
        commerces={commerces}
        onNavigateToCommerce={handleNavigateToCommerce}
      />
      {/* Bouton pour recentrer la carte sur la position de l'utilisateur */}
      {showUserLocation && userLocation && (
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={centerOnUserLocation}
        >
          <MaterialIcons name="my-location" size={24} color="#279AF1" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  myLocationButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#070600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 1,
    borderColor: '#EA526F',
  },
});

export default CustomMapView; 