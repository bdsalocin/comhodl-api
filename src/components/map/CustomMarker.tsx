import React from 'react';
import { View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { Place } from '../../data/places';
import { openGPS } from '../../utils/locationUtils';
import PlaceCallout from './PlaceCallout';
import { markerCalloutStyles } from '../../styles/calloutStyles';

/**
 * Interface des props du composant CustomMarker
 */
interface CustomMarkerProps {
  place: Place;
  userLocation?: {
    latitude: number;
    longitude: number;
  } | null;
}

/**
 * Composant qui affiche un marqueur personnalisé pour un lieu sur la carte
 * 
 * @param place - Informations sur le lieu à afficher
 * @param userLocation - Position de l'utilisateur pour calculer la distance
 */
const CustomMarker: React.FC<CustomMarkerProps> = ({ place, userLocation }) => {
  return (
    <Marker
      coordinate={place.coordinate}
      title={place.name}
      description={place.description}
      tracksViewChanges={false}
    >
      {/* Affichage du marqueur personnalisé */}
      <View style={markerCalloutStyles.markerContainer}>
        <Text style={markerCalloutStyles.markerText}>{place.icon}</Text>
        <Text style={markerCalloutStyles.markerLabel}>{place.name.split(' ')[0]}</Text>
      </View>
      
      {/* Infobulle qui s'affiche au clic sur le marqueur */}
      <Callout 
        tooltip
        alphaHitTest
        onPress={() => openGPS(place)}
      >
        <PlaceCallout place={place} userLocation={userLocation} />
      </Callout>
    </Marker>
  );
};

export default CustomMarker; 