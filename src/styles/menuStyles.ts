import { StyleSheet } from 'react-native';

// Styles pour le composant PlacesMenu
export const placesMenuStyles = StyleSheet.create({
  // Style du conteneur principal du menu
  menuContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    zIndex: 5,
    paddingTop: 50,
  },
  
  // Style du contenu défilant
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Style de l'en-tête du menu
  menuHeader: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  // Style du titre du menu
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  
  // Style des éléments du menu (places)
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  // Style de l'en-tête de chaque élément
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  // Style de l'icône
  menuItemIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  
  // Style du titre de l'élément
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  
  // Style de la description
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  
  // Style de la section info (horaires/statut)
  menuItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  
  // Style des horaires
  menuItemHours: {
    fontSize: 12,
    color: '#666',
  },
  
  // Style du statut (ouvert/fermé)
  menuItemStatus: {
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
  
  // Style pour l'affichage de la distance
  menuItemDistance: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  
  // Style pour l'affichage des points
  menuItemPoints: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  
  // Style du conteneur de bordure en dégradé
  gradientBorderContainer: {
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  
  // Style de la bordure en dégradé
  gradientBorder: {
    borderRadius: 20,
    padding: 2,
  },
  
  // Style du bouton "Y aller"
  yAllerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Style du texte du bouton "Y aller"
  yAllerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Style du pied de page du menu
  menuFooter: {
    height: 80,
  },
}); 