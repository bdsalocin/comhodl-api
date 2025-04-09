import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import FloatingNavBar from '../components/FloatingNavBar';
import * as Haptics from 'expo-haptics';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  color: string[];
};

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Première visite',
    description: 'Visiter votre premier commerce local',
    icon: 'map-marker-check',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    color: ['#4CAF50', '#8BC34A'],
  },
  {
    id: '2',
    title: 'Explorateur urbain',
    description: 'Visiter 5 commerces différents',
    icon: 'compass',
    unlocked: true,
    progress: 5,
    maxProgress: 5,
    color: ['#2196F3', '#03A9F4'],
  },
  {
    id: '3',
    title: 'Fidèle client',
    description: 'Visiter le même commerce 3 fois',
    icon: 'heart',
    unlocked: false,
    progress: 1,
    maxProgress: 3,
    color: ['#F44336', '#FF5722'],
  },
  {
    id: '4',
    title: 'Aventurier',
    description: 'Visiter un commerce à plus de 5km de chez vous',
    icon: 'rocket',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    color: ['#9C27B0', '#673AB7'],
  },
  {
    id: '5',
    title: 'Superstar locale',
    description: 'Partager 10 avis sur des commerces',
    icon: 'star',
    unlocked: false,
    progress: 3,
    maxProgress: 10,
    color: ['#FFC107', '#FFEB3B'],
  },
  {
    id: '6',
    title: 'Photographe culinaire',
    description: 'Prendre 5 photos dans des restaurants',
    icon: 'camera',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    color: ['#607D8B', '#90A4AE'],
  },
  {
    id: '7',
    title: 'Noctambule',
    description: 'Visiter un commerce après 22h',
    icon: 'weather-night',
    unlocked: false,
    progress: 0,
    maxProgress: 1,
    color: ['#3F51B5', '#5C6BC0'],
  },
  {
    id: '8',
    title: 'Tour du quartier',
    description: 'Visiter tous les commerces dans un rayon de 1km',
    icon: 'map',
    unlocked: false,
    progress: 5,
    maxProgress: 12,
    color: ['#009688', '#4DB6AC'],
  },
];

const AchievementsScreen = () => {
  const [userPoints, setUserPoints] = React.useState(75);
  const [nextLevel, setNextLevel] = React.useState(100);
  const [currentLevel, setCurrentLevel] = React.useState(1);

  useEffect(() => {
    // Calculer le niveau en fonction des points
    const level = Math.floor(userPoints / 100) + 1;
    setCurrentLevel(level);
    setNextLevel((level) * 100);
  }, [userPoints]);

  const renderAchievement = ({ item }: { item: Achievement }) => {
    return (
      <TouchableOpacity
        style={styles.achievementCard}
        onPress={() => {
          if (item.unlocked) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          }
        }}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={item.unlocked ? ['#EA526F', '#279AF1'] : ['#e0e0e0', '#bdbdbd']}
          style={styles.iconContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons
            name={item.icon as any}
            size={30}
            color={item.unlocked ? 'white' : '#757575'}
          />
        </LinearGradient>
        <View style={styles.achievementInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.achievementTitle}>{item.title}</Text>
            {item.unlocked && (
              <MaterialCommunityIcons
                name="check-circle"
                size={18}
                color="#4CAF50"
              />
            )}
          </View>
          <Text style={styles.achievementDescription}>{item.description}</Text>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${(item.progress / item.maxProgress) * 100}%`,
                  backgroundColor: item.unlocked
                    ? item.color[0]
                    : '#9e9e9e',
                },
              ]}
            />
            <Text style={styles.progressText}>
              {item.progress}/{item.maxProgress}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const progressPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accomplissements</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{currentLevel}</Text>
          </View>
          <View style={styles.levelInfo}>
            <Text style={styles.levelTitle}>Niveau {currentLevel}</Text>
            <View style={styles.levelProgressContainer}>
              <View 
                style={[
                  styles.levelProgressBar, 
                  {width: `${(userPoints % 100)}%`}
                ]} 
              />
            </View>
            <Text style={styles.levelProgressText}>
              {userPoints}/{nextLevel} points
            </Text>
          </View>
        </View>
        
        <View style={styles.achievementSummary}>
          <Text style={styles.achievementSummaryTitle}>Succès débloqués</Text>
          <View style={styles.achievementProgressContainer}>
            <View 
              style={[
                styles.achievementProgressBar, 
                {width: `${progressPercentage}%`}
              ]} 
            />
          </View>
          <Text style={styles.achievementProgressText}>
            {unlockedCount}/{totalCount} ({progressPercentage}%)
          </Text>
        </View>
      </View>
      
      <FlatList
        data={achievements}
        renderItem={renderAchievement}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.achievementsList}
      />
      
      <FloatingNavBar activeTab="achievements" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#BCE0ED',
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D14C70',
    textAlign: 'center',
  },
  statsContainer: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 15,
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#D14C70',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  levelText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#062D3F',
    marginBottom: 5,
  },
  levelProgressContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#BCE0ED',
  },
  levelProgressBar: {
    height: '100%',
    backgroundColor: '#D14C70',
    borderRadius: 5,
  },
  levelProgressText: {
    fontSize: 12,
    color: '#8A7F8D',
  },
  achievementSummary: {
    marginTop: 5,
  },
  achievementSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#062D3F',
    marginBottom: 5,
  },
  achievementProgressContainer: {
    height: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#BCE0ED',
  },
  achievementProgressBar: {
    height: '100%',
    backgroundColor: '#D14C70',
    borderRadius: 5,
  },
  achievementProgressText: {
    fontSize: 12,
    color: '#8A7F8D',
  },
  achievementsList: {
    padding: 15,
    paddingTop: 5,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#062D3F',
    marginRight: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#8A7F8D',
    marginBottom: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#8A7F8D',
    position: 'absolute',
    right: 0,
    top: 10,
  },
});

export default AchievementsScreen; 