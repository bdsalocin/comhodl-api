import React, { useEffect } from 'react';
import { View, StyleSheet, Text, Animated, Dimensions, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS, FONTS, FONT_SIZES } from '../styles/theme';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  
  // Animations
  const logoScale = new Animated.Value(0.3);
  const logoOpacity = new Animated.Value(0);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    // Animation du logo
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Animation du texte
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    // Redirection après 3 secondes
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Logo du dinosaure */}
      <Animated.View style={[styles.logoContainer, { 
        opacity: logoOpacity,
        transform: [{ scale: logoScale }]
      }]}>
        <Image 
          source={require('../../assets/dino-logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </Animated.View>
      
      {/* Nom de l'application en bas */}
      <Animated.View style={[styles.footerContainer, { opacity: textOpacity }]}>
        <Text style={styles.title}>comHodos</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  footerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: 'bold',
    color: COLORS.background,
    fontFamily: FONTS.regular,
  },
});

export default SplashScreen; 