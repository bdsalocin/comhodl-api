import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MapView from 'react-native-maps';
import { Place } from '../../data/places';
import { calculateDistance, openGPS } from '../../utils/locationUtils';
import { animateButtonPress } from '../../utils/animationUtils';

interface PlacesMenuProps {
  menuAnimation: Animated.Value;
  places: Place[];
  mapRef: React.RefObject<MapView>;
  toggleMenu: () => void;
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  menuItemScales: Animated.Value[];
}

const PlacesMenu: React.FC<PlacesMenuProps> = ({
  menuAnimation,
  places,
  mapRef,
  toggleMenu,
  userLocation,
  menuItemScales
}) => {
  
  const menuWidth = menuAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '70%'],
  });

  const renderPlaceMenuItem = (place: Place, index: number) => {
    // Calculer la distance si la localisation est disponible
    let distance = null;
    if (userLocation) {
      distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        place.coordinate.latitude,
        place.coordinate.longitude
      );
    }

    return (
      <TouchableOpacity 
        key={place.id} 
        style={styles.menuItem}
        onPress={() => {
          mapRef.current?.animateToRegion({
            latitude: place.coordinate.latitude,
            longitude: place.coordinate.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }, 1000);
          toggleMenu();
        }}
      >
        <View style={styles.menuItemHeader}>
          <Text style={styles.menuItemIcon}>{place.icon}</Text>
          <Text style={styles.menuItemTitle}>{place.name}</Text>
        </View>
        <Text style={styles.menuItemDescription}>{place.description}</Text>
        <View style={styles.menuItemInfo}>
          <Text style={styles.menuItemHours}>⏱️ {place.horaires}</Text>
          <Text style={[styles.menuItemStatus, place.isOpen ? styles.openStatus : styles.closedStatus]}>
            {place.isOpen ? 'Ouvert' : 'Fermé'}
          </Text>
        </View>
        {distance !== null && (
          <Text style={styles.menuItemDistance}>🧭 {distance} km</Text>
        )}
        <Text style={styles.menuItemPoints}>✨ {place.points} pts</Text>
        
        <View style={styles.gradientBorderContainer}>
          <LinearGradient
            colors={['#4776E6', '#8E54E9', '#FF4081']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientBorder}
          >
            <Animated.View style={{ transform: [{ scale: menuItemScales[index] }] }}>
              <TouchableOpacity 
                style={styles.yAllerButton}
                activeOpacity={0.5}
                onPress={() => {
                  animateButtonPress(menuItemScales[index]);
                  setTimeout(() => openGPS(place), 200);
                }}
              >
                <Text style={styles.yAllerButtonText}>🚗 Y aller</Text>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[styles.menuContainer, { width: menuWidth }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.menuHeader}>
          <Text style={styles.menuTitle}>Lieux à découvrir</Text>
        </View>
        {places.map((place, index) => renderPlaceMenuItem(place, index))}
        <View style={styles.menuFooter} />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
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
  scrollContent: {
    paddingBottom: 100,
  },
  menuHeader: {
    padding: 20,
    paddingTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',

  },
  menuItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuItemIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  menuItemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  menuItemHours: {
    fontSize: 12,
    color: '#666',
  },
  menuItemStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  openStatus: {
    color: '#4CAF50',
  },
  closedStatus: {
    color: '#F44336',
  },
  menuItemDistance: {
    fontSize: 12,
    color: '#555',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuItemPoints: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  gradientBorderContainer: {
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  gradientBorder: {
    borderRadius: 20,
    padding: 2,
  },
  yAllerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yAllerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuFooter: {
    height: 80,
  },
});

export default PlacesMenu; 