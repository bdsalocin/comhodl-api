import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../contexts/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { FONT_SIZES, COLORS, FONTS } from '../styles/theme';

// Types pour les props de navigation
type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

// Type pour le profil de l'utilisateur
type UserProfile = 'user' | 'merchant';

// Type pour le genre
type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

// Type pour le statut relationnel
type RelationshipStatus = 'single' | 'in_relationship' | 'married' | 'separated' | 'divorced' | 'widowed' | 'prefer_not_to_say';

// Schéma de validation du formulaire - étape 1 (informations de base)
const basicInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('Le prénom est requis'),
  lastName: yup
    .string()
    .required('Le nom est requis'),
  email: yup
    .string()
    .required('L\'email est requis')
    .email('Format d\'email invalide'),
  password: yup
    .string()
    .required('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre'
    ),
  confirmPassword: yup
    .string()
    .required('La confirmation du mot de passe est requise')
    .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas'),
});

// Type pour les données du formulaire - étape 1
type BasicInfoFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Type pour le formulaire complet
type RegistrationData = BasicInfoFormData & {
  userProfile: UserProfile;
  gender: Gender;
  relationshipStatus: RelationshipStatus;
  hasChildren: boolean;
  hasPets: boolean;
  age: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
};

// Composant principal d'inscription
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  // État pour suivre l'étape d'inscription
  const [step, setStep] = useState<number>(1);
  const [registrationData, setRegistrationData] = useState<Partial<RegistrationData>>({
    userProfile: 'user', // Valeur par défaut pour tous les utilisateurs
    gender: 'prefer_not_to_say',
    relationshipStatus: 'prefer_not_to_say',
    hasChildren: false,
    hasPets: false,
    age: '',
    termsAccepted: false,
    privacyAccepted: false
  });

  const { signUp, isLoading, error, clearError } = useAuth();

  // Initialisation du formulaire pour les informations de base
  const { control, handleSubmit, formState: { errors } } = useForm<BasicInfoFormData>({
    resolver: yupResolver(basicInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Fonction pour aller à l'étape suivante
  const goToNextStep = (data: BasicInfoFormData) => {
    console.log('Passage à l\'étape 2');
    setRegistrationData(prev => ({ ...prev, ...data }));
    setStep(2);
  };

  // Fonction pour revenir à l'étape précédente
  const goToPreviousStep = () => {
    setStep(1);
  };

  // Fonction pour gérer la soumission finale
  const handleRegistration = async () => {
    if (!registrationData.termsAccepted || !registrationData.privacyAccepted) {
      Alert.alert(
        'Confirmation requise',
        'Vous devez accepter les conditions d\'utilisation et la politique de confidentialité pour continuer.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      // Dans un cas réel, nous enverrions toutes les données à l'API
      // Pour l'instant, nous utilisons simplement l'email et le mot de passe pour l'inscription simulée
      if (registrationData.email && registrationData.password) {
        const success = await signUp(registrationData.email, registrationData.password);
        if (success) {
          // Enregistrer que l'utilisateur a vu l'onboarding
          await SecureStore.setItemAsync('hasSeenOnboarding', 'true');
          
          Alert.alert(
            'Inscription réussie',
            'Votre compte a été créé avec succès.',
            [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
          );
        }
      }
    } catch (err: any) {
      Alert.alert('Erreur', err.message);
    }
  };

  // Afficher les erreurs d'authentification
  if (error) {
    Alert.alert('Erreur', error, [
      { text: 'OK', onPress: clearError }
    ]);
  }

  const updateRegistrationData = (field: keyof RegistrationData, value: any) => {
    setRegistrationData(prev => ({ ...prev, [field]: value }));
  };

  // Fonction pour sélectionner le genre
  const selectGender = (gender: Gender) => {
    updateRegistrationData('gender', gender);
  };

  // Fonction pour sélectionner le statut relationnel
  const selectRelationshipStatus = (status: RelationshipStatus) => {
    updateRegistrationData('relationshipStatus', status);
  };

  // Fonction pour afficher le libellé du genre
  const getGenderLabel = (gender: Gender): string => {
    switch (gender) {
      case 'male': return 'Homme';
      case 'female': return 'Femme';
      case 'non_binary': return 'Non-binaire';
      case 'prefer_not_to_say': return 'Préfère ne pas répondre';
      default: return '';
    }
  };

  // Fonction pour afficher le libellé du statut relationnel
  const getRelationshipStatusLabel = (status: RelationshipStatus): string => {
    switch (status) {
      case 'single': return 'Célibataire';
      case 'in_relationship': return 'En couple';
      case 'married': return 'Marié(e)';
      case 'separated': return 'Séparé(e)';
      case 'divorced': return 'Divorcé(e)';
      case 'widowed': return 'Veuf/Veuve';
      case 'prefer_not_to_say': return 'Préfère ne pas répondre';
      default: return '';
    }
  };

  // Étape 1 : Informations de base
  if (step === 1) {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <StatusBar style="light" />
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.formContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
              <MaterialIcons name="arrow-back" size={24} color="#070600" />
            </TouchableOpacity>
            
            <Text style={styles.title}>Rejoignez l'aventure</Text>
            <Text style={styles.subtitle}>Étape 1 : Informations de base</Text>

            {/* Choix du profil */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Type de compte</Text>
              <View style={styles.profileButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.profileTypeButton,
                    registrationData.userProfile === 'user' && styles.profileTypeButtonActive
                  ]}
                  onPress={() => updateRegistrationData('userProfile', 'user')}
                >
                  <MaterialIcons
                    name="person"
                    size={24}
                    color={registrationData.userProfile === 'user' ? '#F7F7FF' : '#279AF1'}
                  />
                  <Text
                    style={[
                      styles.profileTypeText,
                      registrationData.userProfile === 'user' && styles.profileTypeTextActive
                    ]}
                  >
                    Utilisateur
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.profileTypeButton,
                    registrationData.userProfile === 'merchant' && styles.profileTypeButtonActive
                  ]}
                  onPress={() => updateRegistrationData('userProfile', 'merchant')}
                >
                  <MaterialIcons
                    name="store"
                    size={24}
                    color={registrationData.userProfile === 'merchant' ? '#F7F7FF' : '#23B5D3'}
                  />
                  <Text
                    style={[
                      styles.profileTypeText,
                      registrationData.userProfile === 'merchant' && styles.profileTypeTextActive
                    ]}
                  >
                    Commerçant
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Prénom */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prénom</Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Votre prénom"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName.message}</Text>
              )}
            </View>
            
            {/* Nom */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom</Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Votre nom"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName.message}</Text>
              )}
            </View>
            
            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Votre email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>
            
            {/* Mot de passe */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mot de passe</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Votre mot de passe"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>
            
            {/* Confirmation du mot de passe */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmez votre mot de passe"
                    secureTextEntry
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
              )}
            </View>
            
            {/* Bouton pour passer à l'étape suivante */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(goToNextStep)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Continuer</Text>
              )}
            </TouchableOpacity>
            
            {/* Lien pour aller à l'écran de connexion */}
            <TouchableOpacity
              style={styles.switchModeButton}
              onPress={() => navigation.navigate('Login')}
              disabled={isLoading}
            >
              <Text style={styles.switchModeText}>
                Déjà un compte ? Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  // Étape 2 : Informations démographiques et consentement
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.formContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goToPreviousStep}
          >
            <MaterialIcons name="arrow-back" size={24} color="#070600" />
          </TouchableOpacity>
          
          <Text style={styles.title}>Rejoignez l'aventure</Text>
          <Text style={styles.subtitle}>Étape 2 : Informations complémentaires</Text>
          
          {/* Informations démographiques pour les utilisateurs */}
          {registrationData.userProfile === 'user' && (
            <>
              {/* Âge */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Âge</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Votre âge"
                  keyboardType="number-pad"
                  value={registrationData.age}
                  onChangeText={(value) => updateRegistrationData('age', value)}
                  maxLength={3}
                />
              </View>
            
              {/* Genre */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Genre</Text>
                <View style={styles.genderContainer}>
                  {['male', 'female', 'non_binary', 'prefer_not_to_say'].map((gender) => (
                    <TouchableOpacity
                      key={gender}
                      style={[
                        styles.genderOption,
                        registrationData.gender === gender && styles.genderOptionSelected
                      ]}
                      onPress={() => selectGender(gender as Gender)}
                    >
                      <MaterialIcons
                        name={
                          gender === 'male' ? 'male' : 
                          gender === 'female' ? 'female' : 
                          gender === 'non_binary' ? 'transgender' : 'help'
                        }
                        size={20}
                        color={registrationData.gender === gender ? '#F7F7FF' : '#279AF1'}
                      />
                      <Text
                        style={[
                          styles.genderText,
                          registrationData.gender === gender && styles.genderTextSelected
                        ]}
                      >
                        {getGenderLabel(gender as Gender)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Statut relationnel */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Statut relationnel</Text>
                <View style={styles.relationshipContainer}>
                  {['single', 'in_relationship', 'married', 'prefer_not_to_say'].map((status) => (
                    <TouchableOpacity
                      key={status}
                      style={[
                        styles.relationshipOption,
                        registrationData.relationshipStatus === status && styles.relationshipOptionSelected
                      ]}
                      onPress={() => selectRelationshipStatus(status as RelationshipStatus)}
                    >
                      <Text
                        style={[
                          styles.relationshipText,
                          registrationData.relationshipStatus === status && styles.relationshipTextSelected
                        ]}
                      >
                        {getRelationshipStatusLabel(status as RelationshipStatus)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              {/* Présence d'enfants */}
              <View style={styles.optionRow}>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.label}>Avez-vous des enfants ?</Text>
                </View>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleOption,
                      !registrationData.hasChildren && styles.toggleOptionSelected
                    ]}
                    onPress={() => updateRegistrationData('hasChildren', false)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        !registrationData.hasChildren && styles.toggleTextSelected
                      ]}
                    >
                      Non
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleOption,
                      registrationData.hasChildren && styles.toggleOptionSelected
                    ]}
                    onPress={() => updateRegistrationData('hasChildren', true)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        registrationData.hasChildren && styles.toggleTextSelected
                      ]}
                    >
                      Oui
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {/* Présence d'animaux */}
              <View style={styles.optionRow}>
                <View style={styles.optionTextContainer}>
                  <Text style={styles.label}>Avez-vous des animaux ?</Text>
                </View>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleOption,
                      !registrationData.hasPets && styles.toggleOptionSelected
                    ]}
                    onPress={() => updateRegistrationData('hasPets', false)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        !registrationData.hasPets && styles.toggleTextSelected
                      ]}
                    >
                      Non
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleOption,
                      registrationData.hasPets && styles.toggleOptionSelected
                    ]}
                    onPress={() => updateRegistrationData('hasPets', true)}
                  >
                    <Text
                      style={[
                        styles.toggleText,
                        registrationData.hasPets && styles.toggleTextSelected
                      ]}
                    >
                      Oui
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
          
          {/* Conditions d'utilisation */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => updateRegistrationData('termsAccepted', !registrationData.termsAccepted)}
            >
              <MaterialIcons
                name={registrationData.termsAccepted ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#279AF1"
              />
            </TouchableOpacity>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxText}>
                J'accepte les <Text style={styles.linkText}>conditions d'utilisation</Text>
              </Text>
            </View>
          </View>
          
          {/* Politique de confidentialité */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => updateRegistrationData('privacyAccepted', !registrationData.privacyAccepted)}
            >
              <MaterialIcons
                name={registrationData.privacyAccepted ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="#279AF1"
              />
            </TouchableOpacity>
            <View style={styles.checkboxTextContainer}>
              <Text style={styles.checkboxText}>
                J'accepte la <Text style={styles.linkText}>politique de confidentialité</Text>
              </Text>
            </View>
          </View>
          
          {/* Récapitulatif des informations */}
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Récapitulatif</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Profil :</Text>
              <Text style={styles.summaryValue}>
                {registrationData.userProfile === 'user' ? 'Utilisateur' : 'Commerçant'}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Nom complet :</Text>
              <Text style={styles.summaryValue}>
                {`${registrationData.firstName} ${registrationData.lastName}`}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Email :</Text>
              <Text style={styles.summaryValue}>{registrationData.email}</Text>
            </View>
            {registrationData.userProfile === 'user' && (
              <>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Âge :</Text>
                  <Text style={styles.summaryValue}>{registrationData.age || 'Non spécifié'}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Genre :</Text>
                  <Text style={styles.summaryValue}>
                    {getGenderLabel(registrationData.gender as Gender)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Statut relationnel :</Text>
                  <Text style={styles.summaryValue}>
                    {getRelationshipStatusLabel(registrationData.relationshipStatus as RelationshipStatus)}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Enfants :</Text>
                  <Text style={styles.summaryValue}>
                    {registrationData.hasChildren ? 'Oui' : 'Non'}
                  </Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Animaux :</Text>
                  <Text style={styles.summaryValue}>
                    {registrationData.hasPets ? 'Oui' : 'Non'}
                  </Text>
                </View>
              </>
            )}
          </View>
          
          {/* Bouton pour s'inscrire */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleRegistration}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>S'inscrire</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Blanc
  },
  scrollView: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#FFFFFF', // Blanc
    borderRadius: 25,
    margin: 20,
    elevation: 5,
    shadowColor: '#070600',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    borderWidth: 2,
    borderColor: '#23B5D3',
  },
  title: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 25,
    fontFamily: FONTS.regular,
  },
  subtitle: {
    fontSize: FONT_SIZES.large,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: FONTS.regular,
  },
  inputContainer: {
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#070600',
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#279AF1', // Bleu pour les bordures d'input
    borderRadius: 15,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#F7F7FF',
  },
  errorText: {
    color: '#EA526F', // Rose pour les erreurs
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#EA526F',
    borderRadius: 25,
    padding: 16,
    alignItems: 'center',
    marginTop: 25,
    elevation: 3,
    shadowColor: '#070600',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    width: '80%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#F7F7FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchModeButton: {
    marginTop: 25,
    alignItems: 'center',
  },
  switchModeText: {
    color: '#279AF1', // Bleu pour les liens
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1,
    backgroundColor: '#FFFFFF', // Blanc
    borderRadius: 20,
    padding: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#EA526F',
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '90%',
    alignSelf: 'center',
  },
  profileTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#23B5D3', // Bleu clair pour les bordures
    flex: 1,
    marginHorizontal: 10,
  },
  profileTypeButtonActive: {
    backgroundColor: '#279AF1', // Bleu plus vif pour les éléments actifs
    borderColor: '#279AF1',
  },
  profileTypeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#070600',
  },
  profileTypeTextActive: {
    color: '#F7F7FF',
  },
  genderContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#23B5D3', // Bleu clair pour les bordures
    marginBottom: 10,
    width: '45%',
    marginHorizontal: '2%',
    justifyContent: 'center',
  },
  genderOptionSelected: {
    backgroundColor: '#279AF1', // Bleu plus vif pour les éléments actifs
    borderColor: '#279AF1',
  },
  genderText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#070600',
  },
  genderTextSelected: {
    color: '#F7F7FF',
  },
  relationshipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
    width: '95%',
    alignSelf: 'center',
  },
  relationshipOption: {
    padding: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#23B5D3', // Bleu clair pour les bordures
    marginBottom: 10,
    width: '45%',
    marginHorizontal: '2%',
    alignItems: 'center',
  },
  relationshipOptionSelected: {
    backgroundColor: '#279AF1', // Bleu plus vif pour les éléments actifs
    borderColor: '#279AF1',
  },
  relationshipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#070600',
  },
  relationshipTextSelected: {
    color: '#F7F7FF',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  optionTextContainer: {
    flex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#23B5D3', // Bleu clair pour les bordures
    overflow: 'hidden',
  },
  toggleOption: {
    padding: 12,
    width: 65,
    alignItems: 'center',
  },
  toggleOptionSelected: {
    backgroundColor: '#279AF1', // Bleu plus vif pour les éléments actifs
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#070600',
  },
  toggleTextSelected: {
    color: '#F7F7FF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 14,
    color: '#070600',
  },
  linkText: {
    color: '#EA526F', // Rose pour les liens importants
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  summaryContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#FFFFFF', // Blanc
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#23B5D3',
    width: '90%',
    alignSelf: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#EA526F', // Rose pour les titres
  },
  summaryItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  summaryLabel: {
    fontWeight: 'bold',
    width: '40%',
    color: '#070600',
  },
  summaryValue: {
    flex: 1,
    color: '#279AF1', // Bleu pour les valeurs
    fontWeight: '500',
  },
});

export default RegisterScreen; 