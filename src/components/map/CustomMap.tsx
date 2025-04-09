import React from 'react';
import { Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Place } from '../../data/places';
import CustomMarker from './CustomMarker';
import UserMarker from './UserMarker';
import { googleMapStyle } from '../../styles/mapStyles';
import { customMapStyles } from '../../styles/componentStyles';

/**
 * Interface des props du composant CustomMap
 */
interface CustomMapProps {
  mapRef: React.RefObject<MapView>;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  setRegion: (region: any) => void;
  places: Place[];
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
}

/**
 * Composant de carte personnalisé qui affiche les marqueurs des lieux et la position de l'utilisateur
 * 
 * @param mapRef - Référence à l'objet MapView
 * @param region - Région actuellement affichée sur la carte
 * @param setRegion - Fonction pour mettre à jour la région
 * @param places - Tableau des lieux à afficher
 * @param userLocation - Position actuelle de l'utilisateur
 */
const CustomMap: React.FC<CustomMapProps> = ({ 
  mapRef, 
  region, 
  setRegion, 
  places, 
  userLocation 
}) => {
  return (
    <MapView
      ref={mapRef}
      provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
      style={customMapStyles.map}
      region={region}
      onRegionChangeComplete={setRegion}
      showsUserLocation={true}
      showsMyLocationButton={false}
      toolbarEnabled={false}
      zoomControlEnabled={false}
      customMapStyle={googleMapStyle}
      zoomEnabled={true}
      rotateEnabled={true}
      scrollEnabled={true}
      pitchEnabled={true}
      moveOnMarkerPress={false}
      loadingEnabled={true}
      loadingIndicatorColor="#1976D2"
      loadingBackgroundColor="#FFFFFF"
    >
      {/* Afficher le marqueur de l'utilisateur si sa position est disponible */}
      {userLocation && (
        <UserMarker coordinate={userLocation} />
      )}
      
      {/* Afficher un marqueur pour chaque lieu */}
      {places.map((place) => (
        <CustomMarker 
          key={place.id} 
          place={place} 
          userLocation={userLocation} 
        />
      ))}
    </MapView>
  );
};

export default CustomMap; 