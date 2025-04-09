import React from 'react';
import { View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import { userMarkerStyles } from '../../styles/componentStyles';

/**
 * Interface des props du composant UserMarker
 */
interface UserMarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

/**
 * Composant qui affiche la position de l'utilisateur sur la carte
 * avec un marqueur personnalisé
 * 
 * @param coordinate - Coordonnées de l'utilisateur
 */
const UserMarker: React.FC<UserMarkerProps> = ({ coordinate }) => {
  return (
    <Marker
      coordinate={coordinate}
      tracksViewChanges={false}
    >
      <View style={userMarkerStyles.markerContainer}>
        <Text style={userMarkerStyles.markerText}>📍</Text>
        <Text style={userMarkerStyles.markerLabel}>VOUS</Text>
      </View>
    </Marker>
  );
};

export default UserMarker; 