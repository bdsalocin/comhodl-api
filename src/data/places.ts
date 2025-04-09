// Types pour les lieux
export interface Place {
  id: number;
  name: string;
  type: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  description: string;
  icon: string;
  horaires: string;
  isOpen: boolean;
  points: number;
  imageUrl: string;
}

// Définition des lieux à Montpellier
export const MONTPELLIER_PLACES: Place[] = [
  {
    id: 1,
    name: "Place de la Comédie",
    type: "place",
    coordinate: {
      latitude: 43.6089,
      longitude: 3.8797,
    },
    description: "Place centrale de Montpellier",
    icon: "📍",
    horaires: "Toujours ouvert",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Opera_Comedie_Montpellier.jpg/1200px-Opera_Comedie_Montpellier.jpg"
  },
  {
    id: 2,
    name: "Jardin des Plantes",
    type: "park",
    coordinate: {
      latitude: 43.6147,
      longitude: 3.8647,
    },
    description: "Plus ancien jardin botanique de France",
    icon: "🌿",
    horaires: "6h - 20h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Serres_Martins.JPG/1200px-Serres_Martins.JPG"
  },
  {
    id: 3,
    name: "Cathédrale Saint-Pierre",
    type: "church",
    coordinate: {
      latitude: 43.6122,
      longitude: 3.8722,
    },
    description: "Cathédrale gothique du XIVe siècle",
    icon: "🏛️",
    horaires: "8h - 19h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Fa%C3%A7ade_St_Pierre.JPG/800px-Fa%C3%A7ade_St_Pierre.JPG"
  },
  {
    id: 4,
    name: "Musée Fabre",
    type: "museum",
    coordinate: {
      latitude: 43.6111,
      longitude: 3.8800,
    },
    description: "Musée des beaux-arts",
    icon: "🖼️",
    horaires: "10h - 18h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Mus%C3%A9e_Fabre_-_Montpellier.jpg"
  },
  {
    id: 5,
    name: "Marché du Lez",
    type: "shopping",
    coordinate: {
      latitude: 43.6222,
      longitude: 3.9122,
    },
    description: "Centre commercial moderne",
    icon: "🛒",
    horaires: "10h - 20h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/March%C3%A9_du_Lez-vue_d%27ensemble-Montpellier.jpg"
  },
  {
    id: 6,
    name: "Stade de la Mosson",
    type: "sport",
    coordinate: {
      latitude: 43.6222,
      longitude: 3.8122,
    },
    description: "Stade de football",
    icon: "🏆",
    horaires: "9h - 17h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Match_MHSC_PSG_au_Stade_de_la_Mosson.jpg"
  },
  {
    id: 7,
    name: "Gare Saint-Roch",
    type: "transport",
    coordinate: {
      latitude: 43.6044,
      longitude: 3.8778,
    },
    description: "Gare principale",
    icon: "🚉",
    horaires: "5h - 23h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Gare_de_Montpellier_Saint-Roch_-_Fa%C3%A7ade.jpg/1200px-Gare_de_Montpellier_Saint-Roch_-_Fa%C3%A7ade.jpg"
  },
  {
    id: 8,
    name: "Antigone",
    type: "architecture",
    coordinate: {
      latitude: 43.6089,
      longitude: 3.8897,
    },
    description: "Quartier architectural",
    icon: "🏙️",
    horaires: "Toujours ouvert",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Montpellier_Place_du_Nombre_d%27Or_P1280267.jpg/1200px-Montpellier_Place_du_Nombre_d%27Or_P1280267.jpg"
  },
  {
    id: 9,
    name: "Parc Montcalm",
    type: "park",
    coordinate: {
      latitude: 43.6189,
      longitude: 3.8697,
    },
    description: "Parc public",
    icon: "🌳",
    horaires: "7h - 21h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Montpellier_parc_Montcalm_P1360728.jpg"
  },
  {
    id: 10,
    name: "Place du Marché aux Fleurs",
    type: "market",
    coordinate: {
      latitude: 43.6100,
      longitude: 3.8750,
    },
    description: "Marché aux fleurs",
    icon: "💐",
    horaires: "8h - 13h",
    isOpen: true,
    points: 150,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Montpellier_hal.jpg/1200px-Montpellier_hal.jpg"
  }
]; 