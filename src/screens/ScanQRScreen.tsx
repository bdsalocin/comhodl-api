import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import FloatingNavBar from '../components/FloatingNavBar';

// Vérifier si les modules sont disponibles pour éviter les erreurs
let BarCodeScanner;
let Camera;
try {
  BarCodeScanner = require('expo-barcode-scanner').BarCodeScanner;
  Camera = require('expo-camera').Camera;
} catch (error) {
  console.log("Modules de caméra non disponibles:", error);
}

const ScanQRScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [flashMode, setFlashMode] = useState(Camera?.Constants?.FlashMode?.off || 0);
  const [rewardAnimation] = useState(new Animated.Value(0));
  const [lastScannedData, setLastScannedData] = useState('');
  const [showReward, setShowReward] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);
  const [rewardTitle, setRewardTitle] = useState('');

  useEffect(() => {
    (async () => {
      if (!BarCodeScanner) {
        setHasPermission(false);
        return;
      }
      
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        console.log("Erreur lors de la demande de permission:", error);
        setHasPermission(false);
      }
    })();
  }, []);

  const animateReward = () => {
    setShowReward(true);
    Animated.sequence([
      Animated.timing(rewardAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(rewardAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowReward(false);
    });
  };

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    try {
      if (scanned || data === lastScannedData) return;
      
      setScanned(true);
      setLastScannedData(data);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Simuler la vérification des données du QR code
      if (data.startsWith('mapstore:')) {
        const parts = data.split(':');
        if (parts.length >= 3) {
          const storeId = parts[1];
          const actionType = parts[2];
          
          // Points aléatoires entre 5 et 25
          const points = Math.floor(Math.random() * 20) + 5;
          setRewardPoints(points);
          
          // Différents titres selon l'action
          if (actionType === 'visit') {
            setRewardTitle('Visite validée !');
            setTimeout(() => {
              animateReward();
            }, 200);
          } else if (actionType === 'purchase') {
            setRewardTitle('Achat récompensé !');
            setTimeout(() => {
              animateReward();
            }, 200);
          } else {
            Alert.alert('QR Code non reconnu', 'Ce QR code est invalide ou a expiré.');
          }
        } else {
          Alert.alert('QR Code non reconnu', 'Format de QR code incorrect.');
        }
      } else {
        Alert.alert('QR Code invalide', 'Ce n\'est pas un QR code de l\'application.');
      }
      
      // Réinitialiser après 3 secondes
      setTimeout(() => {
        setScanned(false);
      }, 3000);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de traiter ce QR code.');
      setScanned(false);
    }
  };

  const toggleFlash = () => {
    if (!Camera?.Constants?.FlashMode) return;
    
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  };

  const toggleScanning = () => {
    setScanning(!scanning);
  };

  // Si les modules ne sont pas disponibles
  if (!BarCodeScanner || !Camera) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scanner un QR code</Text>
        </View>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="no-photography" size={70} color="#D14C70" />
          <Text style={styles.permissionText}>Fonctionnalité non disponible</Text>
          <Text style={styles.permissionSubText}>
            Cette fonctionnalité n'est pas disponible sur votre appareil ou dans cet environnement.
          </Text>
        </View>
        <FloatingNavBar activeTab="scan" />
      </SafeAreaView>
    );
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scanner un QR code</Text>
        </View>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="hourglass-top" size={70} color="#8A7F8D" />
          <Text style={styles.permissionText}>Demande d'autorisation...</Text>
          <Text style={styles.permissionSubText}>
            Nous vérifions l'accès à la caméra de votre appareil.
          </Text>
        </View>
        <FloatingNavBar activeTab="scan" />
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Scanner un QR code</Text>
        </View>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="no-photography" size={70} color="#D14C70" />
          <Text style={styles.permissionText}>Accès à la caméra refusé</Text>
          <Text style={styles.permissionSubText}>
            Veuillez autoriser l'accès à la caméra dans les paramètres de votre appareil pour scanner des QR codes.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={() => Alert.alert('Ouvrir les paramètres', 'Cette action vous redirigera vers les paramètres de votre appareil.')}>
            <Text style={styles.permissionButtonText}>Ouvrir les paramètres</Text>
          </TouchableOpacity>
        </View>
        <FloatingNavBar activeTab="scan" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Scanner un QR code</Text>
      </View>
      
      <View style={styles.cameraContainer}>
        {scanning ? (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            flashMode={flashMode}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            }}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          >
            <View style={styles.overlay}>
              <View style={styles.unfilled} />
              <View style={styles.scanner}>
                <View style={styles.scannerRow}>
                  <View style={[styles.scannerCorner, styles.scannerCornerTL]} />
                  <View style={styles.scannerBorder} />
                  <View style={[styles.scannerCorner, styles.scannerCornerTR]} />
                </View>
                <View style={styles.scannerCol}>
                  <View style={styles.scannerBorder} />
                  <View style={styles.scannerEmpty} />
                  <View style={styles.scannerBorder} />
                </View>
                <View style={styles.scannerRow}>
                  <View style={[styles.scannerCorner, styles.scannerCornerBL]} />
                  <View style={styles.scannerBorder} />
                  <View style={[styles.scannerCorner, styles.scannerCornerBR]} />
                </View>
              </View>
              <View style={styles.unfilled}>
                <Text style={styles.scanText}>
                  Placez le QR code à l'intérieur du cadre
                </Text>
              </View>
            </View>
          </Camera>
        ) : (
          <View style={styles.pausedContainer}>
            <MaterialIcons name="pause-circle-filled" size={70} color="#8A7F8D" />
            <Text style={styles.pausedText}>Scanner en pause</Text>
            <Text style={styles.pausedSubText}>
              Appuyez sur le bouton ci-dessous pour reprendre
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={toggleFlash}
        >
          <MaterialIcons
            name={flashMode === Camera.Constants.FlashMode.torch ? "flash-on" : "flash-off"}
            size={24}
            color="#062D3F"
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.mainButton, !scanning && styles.mainButtonPaused]}
          onPress={toggleScanning}
        >
          <MaterialIcons
            name={scanning ? "pause" : "play-arrow"}
            size={32}
            color="white"
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            Alert.alert("Aide", "Placez le QR code du commerce dans le cadre pour le scanner.");
          }}
        >
          <MaterialIcons name="help-outline" size={24} color="#062D3F" />
        </TouchableOpacity>
      </View>
      
      {showReward && (
        <Animated.View
          style={[
            styles.rewardContainer,
            {
              opacity: rewardAnimation,
              transform: [
                {
                  scale: rewardAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.8, 1.1, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.rewardContent}>
            <MaterialCommunityIcons name="star-circle" size={60} color="#D14C70" />
            <Text style={styles.rewardTitle}>{rewardTitle}</Text>
            <Text style={styles.rewardPoints}>+{rewardPoints} points</Text>
          </View>
        </Animated.View>
      )}
      
      <FloatingNavBar activeTab="scan" />
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
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 20,
    margin: 15,
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  unfilled: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanner: {
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  scannerRow: {
    flexDirection: 'row',
    height: 25,
  },
  scannerCol: {
    flexDirection: 'row',
    height: 200,
  },
  scannerCorner: {
    width: 25,
    height: 25,
    borderWidth: 3,
  },
  scannerCornerTL: {
    borderLeftWidth: 3,
    borderTopWidth: 3,
    borderColor: '#D14C70',
    borderTopLeftRadius: 10,
  },
  scannerCornerTR: {
    borderRightWidth: 3,
    borderTopWidth: 3,
    borderColor: '#D14C70',
    borderTopRightRadius: 10,
  },
  scannerCornerBL: {
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#D14C70',
    borderBottomLeftRadius: 10,
  },
  scannerCornerBR: {
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: '#D14C70',
    borderBottomRightRadius: 10,
  },
  scannerBorder: {
    flex: 1,
    borderColor: 'transparent',
  },
  scannerEmpty: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scanText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  pausedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  pausedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8A7F8D',
    marginTop: 15,
  },
  pausedSubText: {
    fontSize: 14,
    color: '#8A7F8D',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 15,
  },
  iconButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  mainButton: {
    backgroundColor: '#D14C70',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#062D3F',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  mainButtonPaused: {
    backgroundColor: '#8A7F8D',
  },
  rewardContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  rewardContent: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  rewardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#062D3F',
    marginTop: 10,
  },
  rewardPoints: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D14C70',
    marginTop: 5,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#062D3F',
    marginTop: 20,
    textAlign: 'center',
  },
  permissionSubText: {
    fontSize: 14,
    color: '#8A7F8D',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: '#D14C70',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#BCE0ED',
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScanQRScreen; 