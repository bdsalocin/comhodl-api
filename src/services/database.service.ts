import pool from '../config/database';

export class DatabaseService {
  // Utilisateurs
  static async createUser(userData: any) {
    const [result] = await pool.execute(
      'INSERT INTO Utilisateurs (nom, prenom, pseudo, email, mot_de_passe, sexe) VALUES (?, ?, ?, ?, ?, ?)',
      [userData.nom, userData.prenom, userData.pseudo, userData.email, userData.mot_de_passe, userData.sexe]
    );
    return result;
  }

  static async getUserById(id: number) {
    const [rows] = await pool.execute('SELECT * FROM Utilisateurs WHERE idu = ?', [id]);
    return rows[0];
  }

  // Commercants
  static async createCommercant(commercantData: any) {
    const [result] = await pool.execute(
      'INSERT INTO Commercants (nom, adresse_postale, commune, departement, pays, latitude, longitude, secteur_activite, domaine_activite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        commercantData.nom,
        commercantData.adresse_postale,
        commercantData.commune,
        commercantData.departement,
        commercantData.pays,
        commercantData.latitude,
        commercantData.longitude,
        commercantData.secteur_activite,
        commercantData.domaine_activite
      ]
    );
    return result;
  }

  static async getCommercantById(id: number) {
    const [rows] = await pool.execute('SELECT * FROM Commercants WHERE idc = ?', [id]);
    return rows[0];
  }

  // QR Codes
  static async createQRCode(qrData: any) {
    const [result] = await pool.execute(
      'INSERT INTO QR_Codes (idc, qrcode) VALUES (?, ?)',
      [qrData.idc, qrData.qrcode]
    );
    return result;
  }

  static async getQRCodeById(id: number) {
    const [rows] = await pool.execute('SELECT * FROM QR_Codes WHERE idq = ?', [id]);
    return rows[0];
  }

  // Défis
  static async createDefi(defiData: any) {
    const [result] = await pool.execute(
      'INSERT INTO Defis (idc, titre, description, date_debut, date_fin, points_attribues) VALUES (?, ?, ?, ?, ?, ?)',
      [
        defiData.idc,
        defiData.titre,
        defiData.description,
        defiData.date_debut,
        defiData.date_fin,
        defiData.points_attribues
      ]
    );
    return result;
  }

  static async getDefiById(id: number) {
    const [rows] = await pool.execute('SELECT * FROM Defis WHERE idd = ?', [id]);
    return rows[0];
  }

  // Points
  static async updateUserPoints(userId: number, points: number) {
    const [result] = await pool.execute(
      'UPDATE Utilisateurs SET points_disponibles = points_disponibles + ? WHERE idu = ?',
      [points, userId]
    );
    return result;
  }
} 