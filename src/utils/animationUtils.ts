import { Animated } from 'react-native';

// Animation pour réduire puis rétablir la taille d'un élément
export const animateButtonPress = (animatedValue: Animated.Value, scale: number = 0.9, duration: number = 100) => {
  Animated.sequence([
    Animated.timing(animatedValue, {
      toValue: scale,
      duration: duration,
      useNativeDriver: true,
    }),
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }),
  ]).start();
}; 