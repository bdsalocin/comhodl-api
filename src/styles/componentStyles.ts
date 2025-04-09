import { StyleSheet } from 'react-native';

// Styles pour le composant CustomMap
export const customMapStyles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});

// Styles pour le composant MapControls
export const mapControlsStyles = StyleSheet.create({
  controlsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 10,
  },
  menuButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  menuButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  myLocationButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  myLocationButtonText: {
    fontSize: 22,
  },
});

// Styles pour le composant UserMarker
export const userMarkerStyles = StyleSheet.create({
  markerContainer: {
    backgroundColor: '#E3F2FD',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#1976D2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerText: {
    fontSize: 20,
    marginBottom: 2,
  },
  markerLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
}); 