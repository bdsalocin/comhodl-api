import { pool } from '../config/database';

async function testDatabaseConnection() {
  try {
    console.log('🔄 Test de la connexion à la base de données...');
    
    const connection = await pool.getConnection();
    console.log('✅ Connexion réussie !');
    
    // Test simple : sélectionner la version de MySQL
    const [rows] = await connection.query('SELECT VERSION() as version');
    console.log('📊 Version de MySQL:', rows[0].version);
    
    connection.release();
    console.log('✨ Test terminé avec succès !');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors du test de connexion:', error);
    process.exit(1);
  }
}

// Exécuter le test
testDatabaseConnection(); 