import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { animateButtonPress } from '../../utils/animationUtils';
import MapView from 'react-native-maps';

/**
 * Interface des props du composant MapControls
 */
interface MapControlsProps {
  mapRef: React.RefObject<MapView>;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  menuOpen: boolean;
  toggleMenu: () => void;
  menuButtonScale: Animated.Value;
  locationButtonScale: Animated.Value;
}

/**
 * Composant qui affiche les boutons de contrôle de la carte
 * - Bouton pour ouvrir/fermer le menu
 * - Bouton pour centrer sur la position de l'utilisateur
 * 
 * @param mapRef - Référence à l'objet MapView
 * @param location - Position actuelle de l'utilisateur
 * @param menuOpen - État du menu (ouvert/fermé)
 * @param toggleMenu - Fonction pour basculer l'état du menu
 * @param menuButtonScale - Valeur d'animation pour le bouton de menu
 * @param locationButtonScale - Valeur d'animation pour le bouton de localisation
 */
const MapControls: React.FC<MapControlsProps> = ({ 
  mapRef, 
  location, 
  menuOpen, 
  toggleMenu, 
  menuButtonScale, 
  locationButtonScale 
}) => {
  
  /**
   * Gère l'appui sur le bouton de localisation
   * - Anime le bouton
   * - Centre la carte sur la position de l'utilisateur
   */
  const handleMyLocationPress = () => {
    // Animation du bouton
    animateButtonPress(locationButtonScale);
    
    // Centre la carte sur la position de l'utilisateur si disponible
    if (location) {
      mapRef.current?.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Bouton pour centrer sur la position de l'utilisateur */}
      <Animated.View style={[
        styles.button,
        styles.locationButton,
        { transform: [{ scale: locationButtonScale }] }
      ]}>
        <TouchableOpacity 
          onPress={handleMyLocationPress}
          activeOpacity={0.7}
          style={styles.touchable}
        >
          <Text style={styles.buttonText}>🧭</Text>
        </TouchableOpacity>
      </Animated.View>
      
      {/* Bouton pour ouvrir/fermer le menu */}
      <Animated.View style={[
        styles.button,
        styles.menuButton,
        { transform: [{ scale: menuButtonScale }] }
      ]}>
        <TouchableOpacity 
          onPress={toggleMenu}
          activeOpacity={0.7}
          style={styles.touchable}
        >
          <Text style={styles.buttonText}>{menuOpen ? '✕' : '☰'}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 45,
    height: 45,
    overflow: 'hidden',
  },
  touchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButton: {
    marginBottom: 10,
  },
  menuButton: {},
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default MapControls; 