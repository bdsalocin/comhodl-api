import React, { useState, useEffect, useRef } from 'react';
import { View, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MONTPELLIER_PLACES, Place } from '../data/places';
import { animateButtonPress } from '../utils/animationUtils';
import CustomMap from '../components/map/CustomMap';
import MapControls from '../components/map/MapControls';
import PlacesMenu from '../components/menu/PlacesMenu';
import { mapScreenStyles } from '../styles/mapStyles';

type MapScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MapScreen: React.FC = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const mapRef = useRef<MapView>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState({
    latitude: 43.6109,
    longitude: 3.8772,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;
  
  // Animations pour les boutons
  const menuButtonScale = useRef(new Animated.Value(1)).current;
  const locationButtonScale = useRef(new Animated.Value(1)).current;
  const menuItemScales = useRef(MONTPELLIER_PLACES.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission d\'accès à la localisation refusée');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const toggleMenu = () => {
    // Animation du bouton
    animateButtonPress(menuButtonScale);
    
    const toValue = menuOpen ? 0 : 1;
    Animated.timing(menuAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuOpen(!menuOpen);
  };

  // Préparer les props de localisation de l'utilisateur pour les composants enfants
  const userLocation = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  } : null;

  const handleNavigateToCommerce = (place: Place) => {
    setRegion({
      latitude: place.coordinate.latitude,
      longitude: place.coordinate.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  return (
    <View style={mapScreenStyles.container}>
      <CustomMap 
        mapRef={mapRef}
        region={region}
        setRegion={setRegion}
        places={MONTPELLIER_PLACES}
        userLocation={userLocation}
      />
      
      <MapControls 
        mapRef={mapRef}
        location={userLocation}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        menuButtonScale={menuButtonScale}
        locationButtonScale={locationButtonScale}
      />
      
      <PlacesMenu 
        menuAnimation={menuAnimation}
        places={MONTPELLIER_PLACES}
        mapRef={mapRef}
        toggleMenu={toggleMenu}
        userLocation={userLocation}
        menuItemScales={menuItemScales}
      />
    </View>
  );
};

export default MapScreen; 