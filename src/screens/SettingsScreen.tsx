import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { List, Divider, Button, IconButton, useTheme } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function SettingsScreen() {
  const { signOut } = useAuth();
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationServices, setLocationServices] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Section Compte */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Compte</Text>
        <List.Item
          title="Modifier le profil"
          description="Changer votre photo et vos informations"
          left={props => <List.Icon {...props} icon="account-edit" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Changer le mot de passe"
          description="Mettre à jour votre mot de passe"
          left={props => <List.Icon {...props} icon="lock-reset" />}
          onPress={() => {}}
        />
      </View>

      {/* Section Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <List.Item
          title="Notifications"
          description="Activer ou désactiver les notifications"
          left={props => <List.Icon {...props} icon="bell-outline" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Nouveaux commerces"
          description="Être notifié des nouveaux commerces"
          left={props => <List.Icon {...props} icon="store-plus" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Défis quotidiens"
          description="Recevoir des rappels pour les défis"
          left={props => <List.Icon {...props} icon="trophy-outline" />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={notifications ? '#007AFF' : '#f4f3f4'}
            />
          )}
        />
      </View>

      {/* Section Préférences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Préférences</Text>
        <List.Item
          title="Mode sombre"
          description="Activer le thème sombre"
          left={props => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={darkMode ? '#007AFF' : '#f4f3f4'}
            />
          )}
        />
        <Divider />
        <List.Item
          title="Services de localisation"
          description="Autoriser l'accès à votre position"
          left={props => <List.Icon {...props} icon="map-marker" />}
          right={() => (
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={locationServices ? '#007AFF' : '#f4f3f4'}
            />
          )}
        />
      </View>

      {/* Section Aide et Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aide et Support</Text>
        <List.Item
          title="FAQ"
          description="Questions fréquentes"
          left={props => <List.Icon {...props} icon="help-circle-outline" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Nous contacter"
          description="Envoyer un message au support"
          left={props => <List.Icon {...props} icon="email-outline" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="À propos"
          description="Informations sur l'application"
          left={props => <List.Icon {...props} icon="information" />}
          onPress={() => {}}
        />
      </View>

      {/* Section Légale */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Légal</Text>
        <List.Item
          title="Conditions d'utilisation"
          description="Lire les conditions d'utilisation"
          left={props => <List.Icon {...props} icon="file-document-outline" />}
          onPress={() => {}}
        />
        <Divider />
        <List.Item
          title="Politique de confidentialité"
          description="Consulter notre politique de confidentialité"
          left={props => <List.Icon {...props} icon="shield-check-outline" />}
          onPress={() => {}}
        />
      </View>

      {/* Bouton de déconnexion */}
      <Button
        mode="contained"
        onPress={handleSignOut}
        style={styles.logoutButton}
        icon="logout"
      >
        Se déconnecter
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    padding: 16,
    paddingBottom: 8,
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#FF3B30',
  },
}); 