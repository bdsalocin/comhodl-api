# comHodos 

Une application mobile React Native avec authentification et carte interactive, permettant aux utilisateurs de se connecter, répondre à un questionnaire personnalisé et accéder à une carte interactive avec un style minimaliste inspiré de Qwant Maps.

## 🚀 Fonctionnalités

- 🔐 Authentification utilisateur avec email
- 🗺️ Carte interactive OpenStreetMap avec style minimaliste
- 📱 Interface utilisateur moderne avec barre de navigation flottante
- 🔄 Navigation fluide entre les écrans
- 📊 Questionnaire de profil personnalisé avec étapes progressives
- 🔒 Stockage sécurisé des données d'authentification

## 🛠️ Technologies utilisées

- React Native avec TypeScript
- Expo SDK
- React Navigation v6
- React Native Maps
- Expo Secure Store
- Material Icons

## 📋 Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Expo CLI (`npm install -g expo-cli`)
- Un émulateur iOS/Android ou un appareil physique avec l'application Expo Go

## 🔧 Installation

1. Cloner le repository :
```bash
git clone https://github.com/bdsalocin/map-auth-app.git
cd map-auth-app
```

2. Installer les dépendances :
```bash
npm install
# ou
yarn install
```

3. Configurer les variables d'environnement :
```bash
cp .env.example .env
```
Puis éditer le fichier `.env` avec vos configurations.

4. Lancer l'application :
```bash
npm start
# ou
yarn start
```

## 🔐 Configuration de l'authentification

L'application utilise un système d'authentification simulé pour le développement. Pour la production, il faudra :

1. Implémenter une vraie authentification (Firebase, Auth0, etc.)
2. Utiliser des vrais hachages de mots de passe avec bcrypt ou argon2
3. Configurer un backend sécurisé
4. Ajouter la validation des emails

## 🗺️ Configuration de la carte

La carte est configurée avec OpenStreetMap et un style minimaliste personnalisé inspiré de Qwant Maps. Les paramètres peuvent être modifiés dans le fichier `.env` :

- `MAP_INITIAL_LATITUDE` : Latitude initiale (48.8566 pour Paris)
- `MAP_INITIAL_LONGITUDE` : Longitude initiale (2.3522 pour Paris)
- `MAP_INITIAL_ZOOM` : Niveau de zoom initial (14)

## 📱 Structure du projet

```
src/
├── components/     # Composants réutilisables
├── contexts/      # Contextes React (Auth, etc.)
├── navigation/    # Configuration de la navigation
├── screens/       # Écrans de l'application
├── styles/        # Styles et thèmes
├── types/         # Types TypeScript
└── utils/         # Utilitaires (auth, etc.)
```

## 🔒 Sécurité

- Les tokens d'authentification sont stockés de manière sécurisée avec `expo-secure-store`
- Les mots de passe sont simulés en développement
- Les variables d'environnement sont gérées via `.env`
- Navigation sécurisée avec gestion des états authentifiés/non authentifiés

## 🧪 Tests

Pour lancer les tests :
```bash
npm test
# ou
yarn test
```

## 📦 Build

Pour créer une version de production :
```bash
expo build:android
# ou
expo build:ios
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

[@bdsalocin](https://github.com/bdsalocin)

## 🙏 Remerciements

- [React Native](https://reactnative.dev/) - Framework mobile
- [Expo](https://expo.dev/) - Outils de développement
- [OpenStreetMap](https://www.openstreetmap.org/) - Données cartographiques
- [Material Icons](https://material.io/icons/) - Icônes 