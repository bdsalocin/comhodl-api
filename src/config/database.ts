import mysql from 'mysql2/promise';

// Configuration de la base de données
export const dbConfig = {
  host: 'comhodl711.mysql.db',
  user: 'comhodl711',
  password: process.env.DB_PASSWORD, // À définir dans votre .env
  database: 'comhodl711',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Création du pool de connexions
export const pool = mysql.createPool(dbConfig);

// Fonction de test de connexion
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à la base de données réussie');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    return false;
  }
}; 