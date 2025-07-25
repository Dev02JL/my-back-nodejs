const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://jeanlouisnguyen:f8XG5PK13CeZgGC2@clusterpartiel.3qxt7el.mongodb.net/message-app?retryWrites=true&w=majority&appName=ClusterPartiel';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Atlas connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 