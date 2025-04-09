export type Sexe = 'M' | 'F' | 'Autre';
export type SituationFamiliale = 'Célibataire' | 'Couple' | 'Famille';
export type Activite = 'Resto' | 'Shopping' | 'Culture';
export type StatutAbonnement = 'Gratuit' | 'Payant';
export type StatutQRCode = 'Actif' | 'Inactif';
export type StatutDefi = 'Actif' | 'Terminé';
export type StatutParcours = 'En cours' | 'Terminé' | 'Abandonné';

export interface Utilisateur {
  idu: number;
  nom: string;
  prenom: string;
  pseudo: string;
  email: string;
  mot_de_passe: string;
  sexe: Sexe;
  age?: number;
  date_naissance?: Date;
  adresse?: string;
  commune?: string;
  departement?: string;
  pays?: string;
  numero_telephone?: string;
  situation_familiale?: SituationFamiliale;
  avec_enfants?: boolean;
  age_enfants?: string;
  points_disponibles: number;
  date_inscription: Date;
  derniere_connexion?: Date;
  preferences_activites?: Activite[];
}

export interface Commercant {
  idc: number;
  nom: string;
  adresse_postale: string;
  commune: string;
  departement: string;
  pays: string;
  latitude: number;
  longitude: number;
  secteur_activite: string;
  domaine_activite: string;
  offres: string;
  horaires: Record<string, any>;
  descriptif: string;
  photo?: string;
  pmr: boolean;
  email_contact: string;
  telephone: string;
  statut_abonnement: StatutAbonnement;
}

export interface QRCode {
  idq: number;
  idc: number;
  qrcode: string;
  date_creation: Date;
  statut: StatutQRCode;
}

export interface Defi {
  idd: number;
  idc: number;
  titre: string;
  description: string;
  date_debut: Date;
  date_fin: Date;
  duree: number;
  points_attribues: number;
  statut: StatutDefi;
}

export interface DefiRealise {
  iddr: number;
  idu: number;
  idd: number;
  date_realisation: Date;
  points_gagnes: number;
}

export interface QRCodeScanne {
  idqs: number;
  idu: number;
  idq: number;
  date_scan: Date;
  points_gagnes: number;
}

export interface Parcours {
  idp: number;
  idu: number;
  date_creation: Date;
  statut: StatutParcours;
}

export interface ParcoursCommercant {
  idp: number;
  idc: number;
}

export interface PointsUtilises {
  idpu: number;
  idu: number;
  idl: number;
  points_utilises: number;
  date_utilisation: Date;
}

export interface Lot {
  idl: number;
  idc: number;
  titre: string;
  points_requis: number;
  conditions_attribution: string;
  quantite_disponible: number;
  date_expiration: Date;
} 