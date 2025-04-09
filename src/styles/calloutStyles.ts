import { StyleSheet } from 'react-native';

// Styles pour les marqueurs et callouts personnalisés
export const markerCalloutStyles = StyleSheet.create({
  // Style du conteneur de marqueur
  markerContainer: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Style du texte du marqueur
  markerText: {
    fontSize: 20,
    marginBottom: 2,
  },
  
  // Style du libellé du marqueur
  markerLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
  },
  
  // Style du conteneur du callout avec bordure en dégradé
  gradientCalloutContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    width: 220,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  
  // Style de la bordure en dégradé du callout
  gradientCalloutBorder: {
    borderRadius: 15,
    padding: 2,
  },
  
  // Style du conteneur du callout
  calloutContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 13,
    padding: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Style du titre du callout
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  // Style de la description du callout
  calloutDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  
  // Style de la section d'information du callout
  calloutInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  
  // Style des horaires dans le callout
  calloutHours: {
    fontSize: 12,
    color: '#666',
  },
  
  // Style du statut dans le callout
  calloutStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  // Style pour le statut "ouvert"
  openStatus: {
    color: '#4CAF50',
  },
  
  // Style pour le statut "fermé"
  closedStatus: {
    color: '#F44336',
  },
  
  // Style du conteneur de l'image
  imageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: '#f5f5f5',
  },
  
  // Style de l'image du lieu
  placeImage: {
    width: '100%',
    height: '100%',
  },
  
  // Style du conteneur de chargement de l'image
  imageLoadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  
  // Style du conteneur d'erreur de l'image
  imageErrorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  
  // Style du texte d'erreur de l'image
  imageErrorText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  
  // Style du conteneur de légende d'image
  imageCaptionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 0,
    overflow: 'hidden',
  },
  
  // Style de la légende d'image
  imageCaption: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  
  // Style du conteneur de distance
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 5,
  },
  
  // Style du texte de distance
  distanceText: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
  },
  
  // Style du conteneur de points
  pointsContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  
  // Style du texte de points
  pointsText: {
    color: '#1976D2',
    fontWeight: 'bold',
  },
  
  // Style du bouton de navigation
  navigationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#4776E6',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  
  // Style du texte du bouton de navigation
  navigationButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976D2',
  },
}); 