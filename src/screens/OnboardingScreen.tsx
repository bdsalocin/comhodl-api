import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Dimensions, 
  TouchableOpacity, 
  FlatList, 
  Animated, 
  StatusBar 
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

const { width, height } = Dimensions.get('window');

type OnboardingScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;
};

// Données pour les slides d'onboarding
const slides = [
  {
    id: '1',
    title: 'Bienvenue sur comHodos',
    description: 'Découvrez votre ville comme jamais auparavant avec des parcours mensuels uniques.',
    // image: require('../../assets/onboarding-1.png'), 
    backgroundColor: '#FFFFFF', // Blanc
    icon: 'map'
  },
  {
    id: '2',
    title: 'Explorez 10 commerces par mois',
    description: 'Chaque mois, partez à l\'aventure avec 10 nouveaux commerces soigneusement sélectionnés.',
    // image: require('../../assets/onboarding-2.png'),
    backgroundColor: '#FFFFFF', // Blanc
    icon: 'store'
  },
  {
    id: '3',
    title: 'Gagnez des points et des badges',
    description: 'Visitez des commerces, relevez des défis et collectionnez des badges exclusifs.',
    // image: require('../../assets/onboarding-3.png'),
    backgroundColor: '#FFFFFF', // Blanc
    icon: 'emoji-events'
  },
  {
    id: '4',
    title: 'Rejoignez l\'aventure',
    description: 'Créez votre compte et commencez votre exploration urbaine dès maintenant.',
    // image: require('../../assets/onboarding-4.png'),
    backgroundColor: '#FFFFFF', // Blanc
    icon: 'groups'
  }
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  // Animation pour l'opacité des boutons
  const buttonFadeAnim = useRef(new Animated.Value(1)).current;

  // Fonction pour naviguer vers l'écran d'inscription
  const goToRegister = () => {
    navigation.navigate('Register');
  };

  // Fonction pour naviguer vers l'écran de connexion
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  // Fonction pour passer au slide suivant
  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  // Fonction pour revenir au slide précédent
  const goToPrevSlide = () => {
    if (currentIndex > 0) {
      slidesRef.current?.scrollToIndex({ index: currentIndex - 1 });
    }
  };

  // Fonction pour aller au dernier slide
  const goToLastSlide = () => {
    slidesRef.current?.scrollToIndex({ index: slides.length - 1 });
  };

  // Effet d'animation pour les boutons
  const animateButton = (toValue: number) => {
    Animated.sequence([
      Animated.timing(buttonFadeAnim, {
        toValue: toValue,
        duration: 200,
        useNativeDriver: true
      }),
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  };

  // Rendu d'un slide individuel
  const renderSlide = ({ item }: { item: typeof slides[0] }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={[styles.backgroundView, { backgroundColor: item.backgroundColor }]} />
        <View style={styles.overlay} />
        
        <View style={styles.contentContainer}>
          <MaterialIcons name={item.icon as any} size={60} color="#F7F7FF" style={styles.icon} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  // Indicateurs de pagination (les points)
  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
          
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp'
          });
          
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          
          return (
            <Animated.View 
              key={index} 
              style={[
                styles.dot, 
                { width: dotWidth, opacity }
              ]} 
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Skip button */}
      {currentIndex < slides.length - 1 && (
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={goToLastSlide}
        >
          <Text style={styles.skipText}>Passer</Text>
        </TouchableOpacity>
      )}
      
      {/* Slides FlatList */}
      <FlatList
        ref={slidesRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
      />
      
      {/* Navigation controls */}
      <View style={styles.controlsContainer}>
        <Pagination />
        
        {/* Afficher uniquement les boutons sur le dernier slide */}
        {currentIndex === slides.length - 1 && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.loginButton]} 
              onPress={goToLogin}
            >
              <Text style={styles.loginButtonText} numberOfLines={1} adjustsFontSizeToFit>Se connecter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.registerButton]} 
              onPress={goToRegister}
            >
              <Text style={styles.registerButtonText} numberOfLines={1} adjustsFontSizeToFit>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Blanc
  },
  slideContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundView: {
    width,
    height,
    position: 'absolute',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 6, 0, 0.3)', // Noir semi-transparent
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    width: '90%', // Pour rendre responsif
  },
  icon: {
    marginBottom: 20,
    color: '#F7F7FF',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#F7F7FF', // Blanc cassé de la palette
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#F7F7FF', // Blanc cassé de la palette
    textAlign: 'center',
    lineHeight: 28,
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
    backgroundColor: 'rgba(234, 82, 111, 0.6)',
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  skipText: {
    color: '#F7F7FF', // Blanc cassé de la palette
    fontSize: 16,
    fontWeight: '600',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F7F7FF', // Blanc cassé de la palette
    marginHorizontal: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 380,
    alignSelf: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 30,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    minHeight: 55,
    maxHeight: 60,
    shadowColor: '#070600',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#F7F7FF', // Blanc cassé de la palette
  },
  registerButton: {
    backgroundColor: '#EA526F', // Rose de la palette
  },
  loginButtonText: {
    color: '#F7F7FF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButtonText: {
    color: '#F7F7FF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OnboardingScreen; 