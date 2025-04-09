import { Store } from '../types/store';

// Données des commerces à Montpellier
export const stores: Store[] = [
  {
    id: '1',
    name: 'Fromagerie Lou Pastre',
    description: 'Fromagerie artisanale proposant des produits locaux et des spécialités régionales.',
    category: 'Alimentation',
    address: '6 Rue de la Loge, 34000 Montpellier',
    phone: '04 67 60 72 72',
    website: 'https://www.loupastre.fr',
    openingHours: 'Du mardi au samedi: 9h-19h, Dimanche: 9h-13h',
    image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862',
    location: {
      latitude: 43.611237,
      longitude: 3.877626
    },
    rating: 4.7,
    visited: false
  },
  {
    id: '2',
    name: 'Librairie Sauramps',
    description: 'Grande librairie indépendante au cœur de Montpellier, offrant un vaste choix de livres et organisant régulièrement des événements littéraires.',
    category: 'Livres',
    address: 'Le Triangle, Allée Jules Milhau, 34000 Montpellier',
    phone: '04 67 06 78 78',
    website: 'https://www.sauramps.com',
    openingHours: 'Du lundi au samedi: 9h30-19h',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365',
    location: {
      latitude: 43.608651,
      longitude: 3.879401
    },
    rating: 4.5,
    visited: true
  },
  {
    id: '3',
    name: 'Boulangerie Du Pain et des Gâteaux',
    description: 'Boulangerie-pâtisserie traditionnelle, proposant des pains au levain, viennoiseries et pâtisseries maison.',
    category: 'Alimentation',
    address: '15 Rue du Faubourg de la Saunerie, 34000 Montpellier',
    phone: '04 67 55 47 30',
    openingHours: 'Du lundi au samedi: 6h30-19h30, Dimanche: 7h-13h',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff',
    location: {
      latitude: 43.612253,
      longitude: 3.873118
    },
    rating: 4.8,
    visited: true
  },
  {
    id: '4',
    name: 'La Barbote - Café Vélo',
    description: 'Café combinant atelier de réparation de vélos et petite restauration, idéal pour les cyclistes urbains.',
    category: 'Café',
    address: '18 Rue du Faubourg Figuerolles, 34070 Montpellier',
    phone: '09 73 51 04 32',
    website: 'https://www.labarbote.fr',
    openingHours: 'Du mardi au samedi: 10h-19h',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096',
    location: {
      latitude: 43.607593,
      longitude: 3.864135
    },
    rating: 4.6,
    visited: false
  },
  {
    id: '5',
    name: 'Le Gazette Café',
    description: 'Café-restaurant culturel proposant expositions, concerts et événements, avec une cuisine de saison.',
    category: 'Restaurant',
    address: '6 Rue Levat, 34000 Montpellier',
    phone: '04 67 59 07 59',
    website: 'https://www.gazettecafe.com',
    openingHours: 'Du mardi au samedi: 9h-23h',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330',
    location: {
      latitude: 43.608177,
      longitude: 3.881328
    },
    rating: 4.3,
    visited: true
  },
  {
    id: '6',
    name: 'Vinyl Shop',
    description: 'Disquaire indépendant proposant vinyles neufs et d\'occasion dans tous les styles musicaux.',
    category: 'Musique',
    address: '1 Rue Aristide Ollivier, 34000 Montpellier',
    phone: '04 67 58 20 58',
    website: 'https://www.vinylshop-montpellier.fr',
    openingHours: 'Du mardi au samedi: 10h-19h',
    image: 'https://images.unsplash.com/photo-1483412033650-1015ddeb83d1',
    location: {
      latitude: 43.614052,
      longitude: 3.874561
    },
    rating: 4.9,
    visited: false
  },
  {
    id: '7',
    name: 'Diagonale du Sud',
    description: 'Magasin spécialisé dans les jeux de société, offrant conseils personnalisés et espace pour jouer sur place.',
    category: 'Jeux',
    address: '7 Rue des Étuves, 34000 Montpellier',
    phone: '04 67 60 63 25',
    website: 'https://www.diagonaledusud.com',
    openingHours: 'Du mardi au samedi: 10h-19h, Dimanche: 14h-18h',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09',
    location: {
      latitude: 43.612927,
      longitude: 3.878233
    },
    rating: 4.7,
    visited: false
  },
  {
    id: '8',
    name: 'Fleuriste Hortus',
    description: 'Fleuriste artisanal proposant des compositions florales originales et des plantes d\'intérieur.',
    category: 'Fleurs',
    address: '12 Rue de l\'Aiguillerie, 34000 Montpellier',
    phone: '04 67 63 18 75',
    openingHours: 'Du lundi au samedi: 9h-19h30',
    image: 'https://images.unsplash.com/photo-1534449972490-9c1c74211560',
    location: {
      latitude: 43.613782,
      longitude: 3.877111
    },
    rating: 4.6,
    visited: false
  },
  {
    id: '9',
    name: 'Le Petit Epicier',
    description: 'Épicerie fine proposant des produits locaux, bio et en vrac, dans une démarche zéro déchet.',
    category: 'Alimentation',
    address: '10 Rue du Pila Saint Gély, 34000 Montpellier',
    phone: '04 67 55 16 28',
    website: 'https://www.lepetitepicier.fr',
    openingHours: 'Du mardi au samedi: 9h-19h',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e',
    location: {
      latitude: 43.613403,
      longitude: 3.873651
    },
    rating: 4.4,
    visited: true
  },
  {
    id: '10',
    name: 'Atelier Céramique',
    description: 'Boutique-atelier proposant des créations en céramique artisanale et des cours pour tous niveaux.',
    category: 'Artisanat',
    address: '5 Rue du Petit Saint-Jean, 34000 Montpellier',
    phone: '04 67 92 33 27',
    website: 'https://www.atelier-ceramique-montpellier.fr',
    openingHours: 'Du mardi au samedi: 10h-18h',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9',
    location: {
      latitude: 43.610822,
      longitude: 3.876442
    },
    rating: 4.8,
    visited: false
  }
]; 