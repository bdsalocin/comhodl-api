import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  ScrollView, 
  SafeAreaView,
  Dimensions,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, FONT_SIZES } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../contexts/AuthContext';

type ProfileQuestionsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Type pour le genre
type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

// Type pour le statut relationnel
type RelationshipStatus = 'single' | 'in_relationship' | 'other';

// Type pour le statut parental
type ParentalStatus = 'has_children' | 'no_children';

const ProfileQuestionsScreen = () => {
  const navigation = useNavigation<ProfileQuestionsScreenNavigationProp>();
  const { setHasCompletedQuestionnaire } = useAuth();
  
  // État pour suivre l'étape du questionnaire
  const [step, setStep] = useState<number>(1);
  const [gender, setGender] = useState<Gender | null>(null);
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus | null>(null);
  const [parentalStatus, setParentalStatus] = useState<ParentalStatus | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  // Animation pour la transition entre les questions
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navAnim = useRef(new Animated.Value(0)).current;

  // Effet pour le débogage
  useEffect(() => {
    console.log('ProfileQuestionsScreen monté');
    return () => {
      console.log('ProfileQuestionsScreen démonté');
    };
  }, []);

  // Fonction pour revenir à l'étape précédente avec animation
  const goToPreviousStep = () => {
    // Animation de fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Mettre à jour l'étape
      setStep(step - 1);
      
      // Réinitialiser l'animation
      slideAnim.setValue(-Dimensions.get('window').width);
      
      // Animation de slide et fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  // Fonction pour passer à l'étape suivante avec animation
  const goToNextStep = () => {
    // Animation de fade out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Mettre à jour l'étape
      setStep(step + 1);
      
      // Réinitialiser l'animation
      slideAnim.setValue(Dimensions.get('window').width);
      
      // Animation de slide et fade in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    });
  };

  // Fonction pour sélectionner le genre
  const selectGender = (selected: Gender) => {
    setGender(selected);
    // Transition rapide
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setStep(prev => prev + 1);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  };

  // Fonction pour sélectionner le statut relationnel
  const selectRelationshipStatus = (selected: RelationshipStatus) => {
    setRelationshipStatus(selected);
    // Transition rapide
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setStep(prev => prev + 1);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  };

  // Fonction pour sélectionner le statut parental
  const selectParentalStatus = (selected: ParentalStatus) => {
    setParentalStatus(selected);
    // Transition rapide
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setStep(prev => prev + 1);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  };

  // Fonction pour naviguer vers l'écran de carte avec les informations collectées
  const finishQuestionnaire = () => {
    setHasCompletedQuestionnaire(true);
    setTimeout(() => {
      navigation.replace('MainApp');
    }, 100);
  };

  // Fonction pour afficher la question actuelle
  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <Animated.View 
            style={[
              styles.questionContainer, 
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
            ]}
          >
            <Text style={styles.questionTitle}>À quel genre vous identifiez-vous ?</Text>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={[styles.optionCard, gender === 'male' && styles.selectedCard]} 
                onPress={() => selectGender('male')}
              >
                <Ionicons name="man" size={24} color="#070600" />
                <Text style={styles.optionText}>Homme</Text>
                {gender === 'male' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionCard, gender === 'female' && styles.selectedCard]} 
                onPress={() => selectGender('female')}
              >
                <Ionicons name="woman" size={24} color="#070600" />
                <Text style={styles.optionText}>Femme</Text>
                {gender === 'female' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionCard, gender === 'non_binary' && styles.selectedCard]} 
                onPress={() => selectGender('non_binary')}
              >
                <Ionicons name="transgender-outline" size={24} color="#070600" />
                <Text style={styles.optionText}>Non-binaire</Text>
                {gender === 'non_binary' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionCard, gender === 'prefer_not_to_say' && styles.selectedCard]} 
                onPress={() => selectGender('prefer_not_to_say')}
              >
                <MaterialIcons name="remove-circle-outline" size={24} color="#070600" />
                <Text style={styles.optionText}>Ne se prononce pas</Text>
                {gender === 'prefer_not_to_say' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      
      case 2:
        return (
          <Animated.View 
            style={[
              styles.questionContainer, 
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
            ]}
          >
            <Text style={styles.questionTitle}>Quel est votre statut relationnel ?</Text>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={[styles.optionCard, relationshipStatus === 'single' && styles.selectedCard]} 
                onPress={() => selectRelationshipStatus('single')}
              >
                <FontAwesome5 name="user" size={24} color="#070600" />
                <Text style={styles.optionText}>Célibataire</Text>
                {relationshipStatus === 'single' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionCard, relationshipStatus === 'in_relationship' && styles.selectedCard]} 
                onPress={() => selectRelationshipStatus('in_relationship')}
              >
                <FontAwesome5 name="users" size={24} color="#070600" />
                <Text style={styles.optionText}>En couple</Text>
                {relationshipStatus === 'in_relationship' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionCard, relationshipStatus === 'other' && styles.selectedCard]} 
                onPress={() => selectRelationshipStatus('other')}
              >
                <MaterialIcons name="more-horiz" size={24} color="#070600" />
                <Text style={styles.optionText}>Autre</Text>
                {relationshipStatus === 'other' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomActionsContainer}>
              <TouchableOpacity 
                style={styles.backButtonQuestions}
                onPress={goToPreviousStep}
              >
                <MaterialIcons name="arrow-back" size={28} color="#070600" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      
      case 3:
        return (
          <Animated.View 
            style={[
              styles.questionContainer, 
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
            ]}
          >
            <Text style={styles.questionTitle}>Avez-vous des enfants ?</Text>
            
            <View style={styles.optionsContainer}>
              <TouchableOpacity 
                style={[styles.optionCard, parentalStatus === 'has_children' && styles.selectedCard]} 
                onPress={() => selectParentalStatus('has_children')}
              >
                <MaterialCommunityIcons name="human-male-child" size={24} color="#070600" />
                <Text style={styles.optionText}>Avec enfants</Text>
                {parentalStatus === 'has_children' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.optionCard, parentalStatus === 'no_children' && styles.selectedCard]} 
                onPress={() => selectParentalStatus('no_children')}
              >
                <MaterialIcons name="person-outline" size={24} color="#070600" />
                <Text style={styles.optionText}>Sans enfants</Text>
                {parentalStatus === 'no_children' && (
                  <MaterialIcons name="check-circle" size={24} color={COLORS.primary} style={styles.checkIcon} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.bottomActionsContainer}>
              <TouchableOpacity 
                style={styles.backButtonQuestions}
                onPress={goToPreviousStep}
              >
                <MaterialIcons name="arrow-back" size={28} color="#070600" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View 
            style={[
              styles.questionContainer, 
              { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }
            ]}
          >
            <Text style={styles.questionTitle}>Dernière étape !</Text>
            
            <View style={styles.locationContainer}>
              <View style={styles.locationHeader}>
                <MaterialIcons name="location-on" size={24} color="#070600" />
                <Text style={styles.locationTitle}>Partager votre localisation</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.locationPermissionContainer}
                onPress={() => setLocationPermission(!locationPermission)}
              >
                <View style={styles.checkboxContainer}>
                  {locationPermission ? (
                    <MaterialIcons name="check-box" size={24} color={COLORS.primary} />
                  ) : (
                    <MaterialIcons name="check-box-outline-blank" size={24} color="#8A7F8D" />
                  )}
                </View>
                <Text style={styles.locationPermissionText}>
                  J'accepte d'activer ma localisation pour profiter pleinement de l'application conformément à la politique de confidentialité.
                </Text>
              </TouchableOpacity>
              
              <View style={styles.locationInfoContainer}>
                <Text style={styles.locationInfoText}>
                  Votre localisation est utilisée uniquement pour vous connecter avec des personnes proches et vous montrer des lieux d'intérêt. Vous pouvez la désactiver à tout moment.
                </Text>
              </View>
            </View>
            
            <View style={styles.bottomActionsContainer}>
              <TouchableOpacity 
                style={styles.backButtonQuestions}
                onPress={goToPreviousStep}
              >
                <MaterialIcons name="arrow-back" size={28} color="#070600" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.finishButton,
                  !locationPermission && styles.disabledButton
                ]} 
                onPress={finishQuestionnaire}
                disabled={!locationPermission}
              >
                <Text style={styles.finishButtonText}>C'est parti !</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      
      default:
        return null;
    }
  };

  const handleAnswer = (answer: string) => {
    // Transition rapide
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      setStep(prev => prev + 1);
      
      // Réinitialiser et afficher la nouvelle question
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Indicateur de progression */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(step / 4) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>Question {step}/4</Text>
        </View>
        
        {/* Contenu de la question */}
        {renderQuestion()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.accent,
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonQuestions: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 20,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: FONT_SIZES.small,
    fontFamily: FONTS.regular,
    color: '#070600',
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    marginBottom: 20,
  },
  questionTitle: {
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    fontWeight: 'bold',
    color: '#070600',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 15,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 2,
    borderColor: '#070600',
    borderRadius: 20,
    padding: 22,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  selectedCard: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(238, 66, 102, 0.15)',
  },
  optionText: {
    marginLeft: 15,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    color: '#070600',
    fontWeight: 'bold',
  },
  checkIcon: {
    position: 'absolute',
    right: 15,
  },
  // Styles pour l'écran de localisation
  locationContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationTitle: {
    fontSize: FONT_SIZES.large,
    fontFamily: FONTS.bold,
    marginLeft: 10,
    color: '#070600',
  },
  locationPermissionContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    paddingVertical: 10,
  },
  checkboxContainer: {
    paddingRight: 10,
  },
  locationPermissionText: {
    flex: 1,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.regular,
    lineHeight: 22,
    color: '#070600',
  },
  locationInfoContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  locationInfoText: {
    fontSize: FONT_SIZES.small,
    fontFamily: FONTS.regular,
    color: '#070600',
    lineHeight: 20,
  },
  bottomActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    gap: 20,
    paddingLeft: 0,
  },
  finishButton: {
    backgroundColor: '#070600',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 180,
    height: 50,
  },
  disabledButton: {
    backgroundColor: '#777777',
  },
  finishButtonText: {
    color: COLORS.background,
    fontSize: FONT_SIZES.medium,
    fontFamily: FONTS.bold,
    fontWeight: 'bold',
  },
});

export default ProfileQuestionsScreen; 