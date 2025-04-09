import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { COLORS, FONTS, FONT_SIZES, globalStyles } from '../styles/theme';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container]} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.content}>
        <View style={styles.accrocheContainer}>
          <Text style={styles.accrocheTitle}>PLUS DE PRISE DE TÊTE !</Text>
          <Text style={[globalStyles.text, styles.accrocheSubtitle, styles.boldText]}>comHodos trouve pour vous les 10 meilleurs lieux à visiter.</Text>
          <View style={styles.dinoContainer}>
            <Image 
              source={require('../../assets/dino-logo-1.png')} 
              style={styles.dinoImage}
              resizeMode="contain" 
            />
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.connectButton} 
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.connectButtonText}>Me connecter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    paddingTop: 60,
    paddingBottom: 50,
  },
  accrocheContainer: {
    width: '100%',
    alignItems: 'center',
  },
  accrocheTitle: {
    fontSize: FONT_SIZES.xxlarge,
    fontWeight: '900',
    color: '#070600',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  accrocheSubtitle: {
    fontSize: FONT_SIZES.medium,
    textAlign: 'center',
    lineHeight: 24,
    color: '#070600',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 350,
  },
  connectButton: {
    backgroundColor: '#070600',
    borderRadius: 30,
    padding: 16,
    paddingHorizontal: 75,
    alignItems: 'center',
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
  },
  connectButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTS.regular,
  },
  titleContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: FONT_SIZES.large,
    fontWeight: '900',
    color: COLORS.secondary,
    textAlign: 'center',
    fontFamily: FONTS.regular,
  },
  slogan: {
    fontSize: FONT_SIZES.large,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 10,
    fontFamily: FONTS.regular,
  },
  dinoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  dinoImage: {
    width: 180,
    height: 180,
  },
});

export default HomeScreen; 