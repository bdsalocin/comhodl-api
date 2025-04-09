import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Card, ProgressBar, Avatar } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  maxProgress: number;
  isUnlocked: boolean;
}

export default function ProfileScreen() {
  // Données temporaires pour la démonstration
  const userStats = {
    level: 5,
    xp: 750,
    xpToNextLevel: 1000,
    totalPlaces: 12,
    visitedPlaces: 8,
    streak: 5,
    achievements: [
      {
        id: '1',
        title: 'Explorateur Novice',
        description: 'Visitez 5 commerces différents',
        icon: 'explore',
        progress: 5,
        maxProgress: 5,
        isUnlocked: true,
      },
      {
        id: '2',
        title: 'Gourmet',
        description: 'Découvrez 3 restaurants',
        icon: 'restaurant',
        progress: 2,
        maxProgress: 3,
        isUnlocked: false,
      },
      {
        id: '3',
        title: 'Shopping Expert',
        description: 'Visitez 10 boutiques',
        icon: 'shopping-bag',
        progress: 7,
        maxProgress: 10,
        isUnlocked: false,
      },
    ] as Achievement[],
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* En-tête du profil */}
      <View style={styles.header}>
        <Avatar.Image 
          size={100} 
          source={{ uri: 'https://i.pravatar.cc/150' }} 
          style={styles.avatar}
        />
        <Text style={styles.username}>Alex Martin</Text>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Niveau {userStats.level}</Text>
          <ProgressBar 
            progress={userStats.xp / userStats.xpToNextLevel} 
            color="#007AFF"
            style={styles.progressBar}
          />
          <Text style={styles.xpText}>{userStats.xp} / {userStats.xpToNextLevel} XP</Text>
        </View>
      </View>

      {/* Statistiques */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Vos Statistiques</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <MaterialIcons name="place" size={24} color="#007AFF" />
              <Text style={styles.statValue}>{userStats.visitedPlaces}/{userStats.totalPlaces}</Text>
              <Text style={styles.statLabel}>Commerces visités</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
              <Text style={styles.statValue}>{userStats.streak}</Text>
              <Text style={styles.statLabel}>Jours consécutifs</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Accomplissements */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Accomplissements</Text>
          {userStats.achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <MaterialIcons 
                name={achievement.icon as any} 
                size={24} 
                color={achievement.isUnlocked ? '#007AFF' : '#999'} 
              />
              <View style={styles.achievementInfo}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.isUnlocked && styles.achievementLocked
                ]}>
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <ProgressBar 
                  progress={achievement.progress / achievement.maxProgress} 
                  color={achievement.isUnlocked ? '#007AFF' : '#999'}
                  style={styles.achievementProgress}
                />
                <Text style={styles.achievementProgressText}>
                  {achievement.progress}/{achievement.maxProgress}
                </Text>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Défis */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Défis à Venir</Text>
          <View style={styles.challengeItem}>
            <MaterialIcons name="camera-alt" size={24} color="#999" />
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Photographe Gourmet</Text>
              <Text style={styles.challengeDescription}>Prenez en photo un menu de restaurant</Text>
              <Text style={styles.challengeComingSoon}>Bientôt disponible</Text>
            </View>
          </View>
          <View style={styles.challengeItem}>
            <MaterialIcons name="people" size={24} color="#999" />
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Social Butterfly</Text>
              <Text style={styles.challengeDescription}>Prenez une photo avec un serveur</Text>
              <Text style={styles.challengeComingSoon}>Bientôt disponible</Text>
            </View>
          </View>
          <View style={styles.challengeItem}>
            <MaterialIcons name="restaurant" size={24} color="#999" />
            <View style={styles.challengeInfo}>
              <Text style={styles.challengeTitle}>Critique Culinaire</Text>
              <Text style={styles.challengeDescription}>Notez votre expérience dans un restaurant</Text>
              <Text style={styles.challengeComingSoon}>Bientôt disponible</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Bouton de déconnexion */}
      <Button 
        mode="contained" 
        style={styles.logoutButton}
        onPress={() => {}}
      >
        Se Déconnecter
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
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  xpText: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    margin: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 15,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  achievementLocked: {
    color: '#999',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  achievementProgress: {
    height: 4,
    borderRadius: 2,
    marginBottom: 2,
  },
  achievementProgressText: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#FF3B30',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  challengeInfo: {
    flex: 1,
    marginLeft: 15,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#999',
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  challengeComingSoon: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
}); 