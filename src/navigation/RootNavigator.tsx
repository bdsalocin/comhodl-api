import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../types/navigation';

// Import des écrans
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileQuestionsScreen from '../screens/ProfileQuestionsScreen';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated, hasCompletedQuestionnaire, isLoading } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Écran d'ouverture */}
      <Stack.Screen 
        name="Splash" 
        component={SplashScreen}
        options={{
          gestureEnabled: false
        }}
      />

      {/* Écrans non authentifiés */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* Écran de questions */}
      <Stack.Screen 
        name="ProfileQuestionsScreen" 
        component={ProfileQuestionsScreen}
        options={{
          gestureEnabled: false
        }}
      />

      {/* Écrans principaux après authentification */}
      {isAuthenticated && hasCompletedQuestionnaire && (
        <Stack.Screen 
          name="MainApp" 
          component={TabNavigator}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
      )}
    </Stack.Navigator>
  );
} 