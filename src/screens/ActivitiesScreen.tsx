import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions, Easing } from 'react-native';
import { List, Divider, Badge, Card, Title, Paragraph, Button, useTheme, Surface, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface Challenge {
  icon: MaterialIconName;
  title: string;
  description: string;
  progress: number;
  progressText: string;
  buttonIcon: MaterialIconName;
  buttonText: string;
}

export default function ActivitiesScreen() {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'defis' | 'commerces' | 'stats'>('defis');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1500,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handleChallengePress = (challengeId: number) => {
    setSelectedChallenge(challengeId);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleExpandPress = () => {
    setIsExpanded(!isExpanded);
    Animated.sequence([
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 0 : 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: isExpanded ? 1 : 1.05,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTabPress = (tab: 'defis' | 'commerces' | 'stats') => {
    setActiveTab(tab);
    Animated.spring(bounceAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const renderProgressBar = (progress: number, color: string = '#007AFF') => {
    const animatedWidth = progressAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', `${progress}%`],
    });

    return (
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, { width: animatedWidth, backgroundColor: color }]} />
        <Text style={styles.progressText}>{progress}%</Text>
      </View>
    );
  };

  const renderTabButton = (tab: 'defis' | 'commerces' | 'stats', icon: MaterialIconName, label: string) => (
    <TouchableOpacity
      style={[
        styles.tabButton,
        activeTab === tab && styles.activeTabButton,
      ]}
      onPress={() => handleTabPress(tab)}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={activeTab === tab ? theme.colors.primary : '#666'}
      />
      <Text style={[
        styles.tabLabel,
        activeTab === tab && styles.activeTabLabel,
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderChallengeCard = (challenge: Challenge, index: number) => (
    <Animated.View
      key={index}
      style={[
        styles.challengeCardContainer,
        {
          transform: [
            { scale: selectedChallenge === index ? scaleAnim : 1 },
            { scale: isExpanded ? bounceAnim : 1 },
          ],
        },
      ]}
    >
      <Card 
        style={[
          styles.challengeCard, 
          { 
            borderLeftWidth: 4, 
            borderLeftColor: theme.colors.primary,
            backgroundColor: selectedChallenge === index ? theme.colors.primary + '10' : '#fff',
          },
        ]}
        onPress={() => handleChallengePress(index)}
      >
        <Card.Content>
          <View style={styles.challengeHeader}>
            <MaterialIcons 
              name={challenge.icon} 
              size={24} 
              color={theme.colors.primary} 
            />
            <Title style={styles.challengeTitle}>{challenge.title}</Title>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <IconButton
                icon="chevron-down"
                size={20}
                onPress={handleExpandPress}
                style={styles.challengeIconButton}
              />
            </Animated.View>
          </View>
          <Animated.View style={[
            styles.challengeContent,
            {
              maxHeight: isExpanded ? 200 : 0,
              opacity: isExpanded ? 1 : 0,
            },
          ]}>
            <Paragraph>{challenge.description}</Paragraph>
            {renderProgressBar(challenge.progress)}
            <Button 
              mode="contained" 
              style={styles.challengeButton} 
              icon={challenge.buttonIcon}
              onPress={() => {}}
              labelStyle={styles.challengeButtonLabel}
            >
              {challenge.buttonText}
            </Button>
          </Animated.View>
        </Card.Content>
      </Card>
    </Animated.View>
  );

  const challenges: Challenge[] = [
    {
      icon: 'timer',
      title: 'Défi du jour',
      description: 'Visitez 3 commerces différents aujourd\'hui',
      progress: 60,
      progressText: '2/3 commerces',
      buttonIcon: 'map',
      buttonText: 'Voir sur la carte',
    },
    {
      icon: 'calendar-today',
      title: 'Défi hebdomadaire',
      description: 'Accumulez 200 points cette semaine',
      progress: 75,
      progressText: '150/200 points',
      buttonIcon: 'store',
      buttonText: 'Voir les commerces',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* En-tête avec points et niveau */}
      <Animated.View style={[
        styles.headerContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}>
        <Surface style={[styles.headerCard, { backgroundColor: theme.colors.primary }]} elevation={4}>
          <View style={styles.headerContent}>
            <View style={styles.pointsContainer}>
              <MaterialIcons name="star" size={30} color="#FFD700" />
              <Text style={[styles.pointsText, { color: '#fff' }]}>250</Text>
            </View>
            <View style={styles.levelContainer}>
              <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
              <Text style={[styles.levelText, { color: '#fff' }]}>Niveau 5</Text>
            </View>
          </View>
          {renderProgressBar(75, '#FFD700')}
        </Surface>
      </Animated.View>

      {/* Tabs de navigation */}
      <View style={styles.tabsContainer}>
        {renderTabButton('defis', 'timer', 'Défis')}
        {renderTabButton('commerces', 'store', 'Commerces')}
        {renderTabButton('stats', 'bar-chart', 'Statistiques')}
      </View>

      {/* Contenu conditionnel basé sur l'onglet actif */}
      {activeTab === 'defis' && (
        <Animated.View style={[
          styles.sectionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
          <Surface style={styles.section} elevation={2}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="timer" size={24} color={theme.colors.primary} />
              <Text style={styles.sectionTitle}>Défis actifs</Text>
            </View>
            {challenges.map((challenge, index) => renderChallengeCard(challenge, index))}
          </Surface>
        </Animated.View>
      )}

      {activeTab === 'commerces' && (
        <Animated.View style={[
          styles.sectionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
          <Surface style={styles.section} elevation={2}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="store" size={24} color={theme.colors.primary} />
              <Text style={styles.sectionTitle}>Commerces à proximité</Text>
            </View>
            <List.Item
              title="Boulangerie du Coin"
              description="À 500m • 50 points à gagner"
              left={props => <List.Icon {...props} icon="store" />}
              right={() => (
                <View style={styles.badgeContainer}>
                  <Badge size={25} style={{ backgroundColor: theme.colors.primary }}>50</Badge>
                </View>
              )}
              onPress={() => {}}
              style={styles.listItem}
            />
            <Divider />
            <List.Item
              title="Café des Artistes"
              description="À 800m • 30 points à gagner"
              left={props => <List.Icon {...props} icon="store" />}
              right={() => (
                <View style={styles.badgeContainer}>
                  <Badge size={25} style={{ backgroundColor: theme.colors.primary }}>30</Badge>
                </View>
              )}
              onPress={() => {}}
              style={styles.listItem}
            />
            <Button 
              mode="outlined" 
              style={styles.viewAllButton} 
              icon="map" 
              onPress={() => {}}
              labelStyle={styles.viewAllButtonLabel}
            >
              Voir tous les commerces
            </Button>
          </Surface>
        </Animated.View>
      )}

      {activeTab === 'stats' && (
        <Animated.View style={[
          styles.sectionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}>
          <Surface style={styles.section} elevation={2}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="bar-chart" size={24} color={theme.colors.primary} />
              <Text style={styles.sectionTitle}>Vos statistiques</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <MaterialIcons name="store" size={24} color={theme.colors.primary} />
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Commerces visités</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="star" size={24} color="#FFD700" />
                <Text style={styles.statNumber}>250</Text>
                <Text style={styles.statLabel}>Points gagnés</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="emoji-events" size={24} color={theme.colors.primary} />
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Défis réussis</Text>
              </View>
            </View>
          </Surface>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  headerContainer: {
    width: width - 32,
    marginHorizontal: 16,
  },
  headerCard: {
    padding: 16,
    borderRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionContainer: {
    width: width - 32,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 8,
  },
  challengeCardContainer: {
    margin: 8,
  },
  challengeCard: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 8,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18,
  },
  challengeIconButton: {
    margin: 0,
    padding: 0,
  },
  challengeContent: {
    overflow: 'hidden',
  },
  progressContainer: {
    marginTop: 8,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
  },
  challengeButton: {
    marginTop: 12,
  },
  challengeButtonLabel: {
    fontSize: 14,
  },
  badgeContainer: {
    marginRight: 8,
    justifyContent: 'center',
  },
  viewAllButton: {
    margin: 16,
  },
  viewAllButtonLabel: {
    fontSize: 14,
  },
  listItem: {
    paddingVertical: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#f0f0f0',
  },
  tabLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
}); 