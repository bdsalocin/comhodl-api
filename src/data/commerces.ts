export interface Commerce {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export const commerces: Commerce[] = [
  {
    id: '1',
    name: 'Boulangerie du Coin',
    address: '123 rue de la Paix, Paris',
    coordinates: {
      latitude: 48.856614,
      longitude: 2.3522219,
    },
  },
  {
    id: '2',
    name: 'Café des Arts',
    address: '45 avenue des Champs-Élysées, Paris',
    coordinates: {
      latitude: 48.8738,
      longitude: 2.2950,
    },
  },
  {
    id: '3',
    name: 'Restaurant Le Petit Bistrot',
    address: '78 rue du Louvre, Paris',
    coordinates: {
      latitude: 48.8606,
      longitude: 2.3376,
    },
  },
  {
    id: '4',
    name: 'Boutique Mode',
    address: '12 rue de Rivoli, Paris',
    coordinates: {
      latitude: 48.8584,
      longitude: 2.3376,
    },
  },
]; 