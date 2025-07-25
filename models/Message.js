const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true,
    maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  message: {
    type: String,
    required: [true, 'Le message est requis'],
    trim: true,
    maxlength: [1000, 'Le message ne peut pas dépasser 1000 caractères']
  }
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Index pour optimiser les requêtes par date
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema); 