import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Place } from '../../data/places';
import { loadImage, getImageHeaders } from '../../utils/imageUtils';
import { openGPS } from '../../utils/locationUtils';

interface HamburgerMenuProps {
  commerces: Place[];
  onNavigateToCommerce: (place: Place) => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ commerces, onNavigateToCommerce }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoadingStates, setImageLoadingStates] = useState<{ [key: number]: boolean }>({});
  const [imageErrorStates, setImageErrorStates] = useState<{ [key: number]: boolean }>({});
  const [imageUrls, setImageUrls] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const checkImages = async () => {
      const newImageUrls: { [key: number]: string } = {};
      for (const place of commerces) {
        const isValid = await loadImage(place.imageUrl);
        if (isValid) {
          newImageUrls[place.id] = place.imageUrl;
        } else {
          setImageErrorStates(prev => ({ ...prev, [place.id]: true }));
          setImageLoadingStates(prev => ({ ...prev, [place.id]: false }));
        }
      }
      setImageUrls(newImageUrls);
    };
    checkImages();
  }, [commerces]);

  const handleImageLoadStart = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: true }));
  };

  const handleImageLoadEnd = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: number) => {
    setImageLoadingStates(prev => ({ ...prev, [id]: false }));
    setImageErrorStates(prev => ({ ...prev, [id]: true }));
  };

  const handleNavigation = (place: Place) => {
    openGPS(place);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.hamburgerButton}
        onPress={() => setIsOpen(!isOpen)}
      >
        <MaterialIcons name="menu" size={24} color="#000" />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.menuContainer}>
          <ScrollView style={styles.scrollView}>
            {commerces.map((place) => (
              <View key={place.id}>
                <TouchableOpacity
                  style={styles.commerceItem}
                  onPress={() => onNavigateToCommerce(place)}
                >
                  <View style={styles.imageContainer}>
                    {imageLoadingStates[place.id] && (
                      <View style={styles.imageLoadingContainer}>
                        <ActivityIndicator size="small" color="#007AFF" />
                      </View>
                    )}
                    {imageErrorStates[place.id] ? (
                      <View style={styles.imageErrorContainer}>
                        <Text style={styles.imageErrorText}>Image non disponible</Text>
                      </View>
                    ) : (
                      <Image 
                        source={{ 
                          uri: imageUrls[place.id] || place.imageUrl,
                          headers: getImageHeaders()
                        }} 
                        style={styles.commerceImage}
                        onLoadStart={() => handleImageLoadStart(place.id)}
                        onLoadEnd={() => handleImageLoadEnd(place.id)}
                        onError={() => handleImageError(place.id)}
                      />
                    )}
                  </View>
                  <View style={styles.commerceInfo}>
                    <Text style={styles.commerceName}>{place.name}</Text>
                    <Text style={styles.commerceAddress}>{place.description}</Text>
                    <Text style={styles.horaires}>{place.horaires}</Text>
                  </View>
                  <MaterialIcons name="directions" size={24} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={() => handleNavigation(place)}
                >
                  <Text style={styles.navigationButtonText}>🚗 Y ALLER</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 160,
    zIndex: 1000,
  },
  hamburgerButton: {
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
  },
  menuContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxHeight: 400,
    width: 300,
  },
  scrollView: {
    padding: 10,
  },
  commerceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  commerceImage: {
    width: '100%',
    height: '100%',
  },
  imageLoadingContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  imageErrorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  imageErrorText: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  commerceInfo: {
    flex: 1,
  },
  commerceName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commerceAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  horaires: {
    fontSize: 12,
    color: '#999',
  },
  navigationButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  navigationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HamburgerMenu; 