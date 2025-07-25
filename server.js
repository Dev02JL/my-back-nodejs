const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config();

// Initialiser Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/messages', require('./routes/messages'));
app.use('/admin/messages', require('./routes/messages'));

// Route de test
app.get('/', (req, res) => {
  res.json({
    message: 'API Message Backend',
    version: '1.0.0',
    endpoints: {
      'GET /api/messages': 'Récupérer tous les messages',
      'POST /api/messages': 'Créer un nouveau message',
      'GET /admin/messages': 'Récupérer la liste complète des messages (admin)'
    }
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error('Erreur serveur:', error);
  res.status(500).json({
    success: false,
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Erreur interne'
  });
});

// Configuration du port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📡 API disponible sur http://localhost:${PORT}`);
  console.log(`📝 Endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/messages`);
  console.log(`   POST http://localhost:${PORT}/api/messages`);
  console.log(`   GET  http://localhost:${PORT}/admin/messages`);
}); 