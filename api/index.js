const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'comhodl711.mysql.db',
  user: 'comhodl711',
  password: 'bensUwcobZeb9facmy',
  database: 'comhodl711'
};

const pool = mysql.createPool(dbConfig);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/auth/login') {
    try {
      const { email, mot_de_passe } = req.body;
      
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(
        'SELECT * FROM comhodl_utilisateurs WHERE email = ? AND mot_de_passe = ?',
        [email, mot_de_passe]
      );
      connection.release();

      if (rows.length > 0) {
        res.status(200).json({ success: true, user: rows[0] });
      } else {
        res.status(401).json({ success: false, message: 'Identifiants incorrects' });
      }
    } catch (error) {
      console.error('Erreur:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
    return;
  }

  res.status(200).json({ message: 'API ComHodl', status: 'online' });
}