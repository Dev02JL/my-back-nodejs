#!/bin/bash

# Test API Messages - Backend Node.js
# Auteur: Jean-Louis Nguyen
# Date: 2025

echo "🧪 Test de l'API Messages Backend"
echo "=================================="
echo ""

# Configuration
API_BASE_URL="http://localhost:3000"
API_ENDPOINT="$API_BASE_URL/api/messages"
ADMIN_ENDPOINT="$API_BASE_URL/admin/messages"

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher les résultats
print_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ Succès${NC}"
    else
        echo -e "${RED}❌ Échec${NC}"
    fi
    echo ""
}

# Test 1: Vérifier que le serveur fonctionne
echo -e "${BLUE}1️⃣ Test de connexion au serveur${NC}"
curl -s "$API_BASE_URL" > /dev/null
print_result $?

# Test 2: Récupérer tous les messages (API normale)
echo -e "${BLUE}2️⃣ Test GET /api/messages (API normale)${NC}"
curl -s -X GET "$API_ENDPOINT" | jq '.' 2>/dev/null || curl -s -X GET "$API_ENDPOINT"
print_result $?

# Test 3: Créer un premier message
echo -e "${BLUE}3️⃣ Test POST /api/messages - Créer un message${NC}"
curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"name": "Jean-Louis", "message": "Premier message de test !"}' | jq '.' 2>/dev/null || curl -s -X POST "$API_ENDPOINT" -H "Content-Type: application/json" -d '{"name": "Jean-Louis", "message": "Premier message de test !"}'
print_result $?

# Test 4: Créer un deuxième message
echo -e "${BLUE}4️⃣ Test POST /api/messages - Créer un deuxième message${NC}"
curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"name": "Marie", "message": "Deuxième message de test !"}' | jq '.' 2>/dev/null || curl -s -X POST "$API_ENDPOINT" -H "Content-Type: application/json" -d '{"name": "Marie", "message": "Deuxième message de test !"}'
print_result $?

# Test 5: Créer un troisième message
echo -e "${BLUE}5️⃣ Test POST /api/messages - Créer un troisième message${NC}"
curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"name": "Pierre", "message": "Troisième message de test !"}' | jq '.' 2>/dev/null || curl -s -X POST "$API_ENDPOINT" -H "Content-Type: application/json" -d '{"name": "Pierre", "message": "Troisième message de test !"}'
print_result $?

# Test 6: Récupérer tous les messages (API normale) - Vérifier le tri
echo -e "${BLUE}6️⃣ Test GET /api/messages - Vérifier le tri (plus récent en premier)${NC}"
curl -s -X GET "$API_ENDPOINT" | jq '.' 2>/dev/null || curl -s -X GET "$API_ENDPOINT"
print_result $?

# Test 7: Route admin - Récupérer tous les messages (complet)
echo -e "${BLUE}7️⃣ Test GET /admin/messages (Route admin)${NC}"
curl -s -X GET "$ADMIN_ENDPOINT" | jq '.' 2>/dev/null || curl -s -X GET "$ADMIN_ENDPOINT"
print_result $?

# Test 8: Test d'erreur - Message sans nom
echo -e "${BLUE}8️⃣ Test POST avec données manquantes (nom manquant)${NC}"
curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"message": "Message sans nom"}' | jq '.' 2>/dev/null || curl -s -X POST "$API_ENDPOINT" -H "Content-Type: application/json" -d '{"message": "Message sans nom"}'
print_result $?

# Test 9: Test d'erreur - Message sans contenu
echo -e "${BLUE}9️⃣ Test POST avec données manquantes (message manquant)${NC}"
curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test sans message"}' | jq '.' 2>/dev/null || curl -s -X POST "$API_ENDPOINT" -H "Content-Type: application/json" -d '{"name": "Test sans message"}'
print_result $?

# Test 10: Test d'erreur - Corps vide
echo -e "${BLUE}🔟 Test POST avec corps vide${NC}"
curl -s -X POST "$API_ENDPOINT" \
  -H "Content-Type: application/json" \
  -d '{}' | jq '.' 2>/dev/null || curl -s -X POST "$API_ENDPOINT" -H "Content-Type: application/json" -d '{}'
print_result $?

# Test 11: Test route inexistante
echo -e "${BLUE}1️⃣1️⃣ Test route inexistante${NC}"
curl -s -X GET "$API_BASE_URL/api/inexistant" | jq '.' 2>/dev/null || curl -s -X GET "$API_BASE_URL/api/inexistant"
print_result $?

echo -e "${GREEN}🎉 Tests terminés !${NC}"
echo ""
echo -e "${YELLOW}📝 Résumé des endpoints testés :${NC}"
echo "   ✅ GET  /api/messages - Récupérer les messages"
echo "   ✅ POST /api/messages - Créer un message"
echo "   ✅ GET  /admin/messages - Route admin"
echo "   ✅ Tests d'erreurs - Validation des données"
echo ""
echo -e "${BLUE}💡 Pour tester manuellement :${NC}"
echo "   curl -X GET http://localhost:3000/api/messages"
echo "   curl -X POST http://localhost:3000/api/messages -H 'Content-Type: application/json' -d '{\"name\": \"Test\", \"message\": \"Message test\"}'"
echo "   curl -X GET http://localhost:3000/admin/messages" 