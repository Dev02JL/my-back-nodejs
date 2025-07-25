const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// POST /api/messages - Créer un nouveau message
router.post('/', async (req, res) => {
  try {
    const { name, message } = req.body;

    // Validation des données
    if (!name || !message) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et le message sont requis'
      });
    }

    // Création du nouveau message
    const newMessage = new Message({
      name: name.trim(),
      message: message.trim()
    });

    const savedMessage = await newMessage.save();

    res.status(201).json({
      success: true,
      message: 'Message créé avec succès',
      data: savedMessage
    });

  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du message',
      error: error.message
    });
  }
});

    // GET /api/messages - Récupérer tous les messages triés du plus récent au plus ancien
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 }) // Tri du plus récent au plus ancien
      .select('name message createdAt _id'); // Sélection des champs à retourner

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des messages',
      error: error.message
    });
  }
});

// GET /admin/messages - Route admin pour récupérer la liste complète des messages
router.get('/admin', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 }) // Tri du plus récent au plus ancien
      .select('-__v'); // Exclut le champ __v, retourne tous les autres champs

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des messages admin:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des messages admin',
      error: error.message
    });
  }
});

module.exports = router; 