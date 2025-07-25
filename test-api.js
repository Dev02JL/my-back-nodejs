const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';

async function testAPI() {
  try {
    console.log('🧪 Test de l\'API Messages...\n');

    // Test 1: Créer un message
    console.log('1️⃣ Test POST /api/messages');
    const createResponse = await axios.post(`${API_BASE_URL}/messages`, {
      name: 'Jean Test',
      message: 'Ceci est un message de test !'
    });
    console.log('✅ Message créé:', createResponse.data);
    console.log('');

    // Test 2: Récupérer tous les messages
    console.log('2️⃣ Test GET /api/messages');
    const getResponse = await axios.get(`${API_BASE_URL}/messages`);
    console.log('✅ Messages récupérés:', getResponse.data);
    console.log('');

    // Test 3: Test avec données manquantes
    console.log('3️⃣ Test POST avec données manquantes');
    try {
      await axios.post(`${API_BASE_URL}/messages`, {
        name: 'Test sans message'
      });
    } catch (error) {
      console.log('✅ Erreur attendue:', error.response.data.message);
    }
    console.log('');

    console.log('🎉 Tous les tests sont passés !');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Assurez-vous que le serveur est démarré avec: npm run dev');
    }
  }
}

// Exécuter les tests si le fichier est appelé directement
if (require.main === module) {
  testAPI();
}

module.exports = testAPI; 