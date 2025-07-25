# Commandes Curl pour tester l'API Messages

## 🚀 Prérequis
- Serveur démarré sur `http://localhost:3000`
- `curl` installé sur votre système
- Optionnel : `jq` pour un affichage JSON formaté

## 📡 Endpoints disponibles

### 1. Test de connexion au serveur
```bash
curl -X GET http://localhost:3000
```

### 2. Récupérer tous les messages (API normale)
```bash
curl -X GET http://localhost:3000/api/messages
```

### 3. Créer un nouveau message
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name": "Jean-Louis", "message": "Mon message de test !"}'
```

### 4. Récupérer tous les messages (Route admin)
```bash
curl -X GET http://localhost:3000/admin/messages
```

## 🧪 Tests de validation

### 5. Test avec nom manquant
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"message": "Message sans nom"}'
```

### 6. Test avec message manquant
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name": "Test sans message"}'
```

### 7. Test avec corps vide
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{}'
```

### 8. Test route inexistante
```bash
curl -X GET http://localhost:3000/api/inexistant
```

## 🎨 Affichage formaté (avec jq)

Si vous avez `jq` installé, vous pouvez formater les réponses JSON :

```bash
# Récupérer les messages avec formatage
curl -s -X GET http://localhost:3000/api/messages | jq '.'

# Créer un message avec formatage de la réponse
curl -s -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"name": "Test", "message": "Message test"}' | jq '.'
```

## 📊 Tests de performance

### 9. Test de charge simple
```bash
# Créer plusieurs messages rapidement
for i in {1..5}; do
  curl -s -X POST http://localhost:3000/api/messages \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"Utilisateur $i\", \"message\": \"Message numéro $i\"}" > /dev/null
  echo "Message $i créé"
done
```

### 10. Vérifier le tri chronologique
```bash
curl -s -X GET http://localhost:3000/api/messages | jq '.data[] | {name, message, createdAt}'
```

## 🔧 Variables d'environnement

Vous pouvez créer un fichier `.env` pour les tests :

```bash
# .env
API_BASE_URL=http://localhost:3000
```

Puis utiliser les variables dans vos tests :

```bash
source .env
curl -X GET $API_BASE_URL/api/messages
```

## 📝 Exemples de réponses

### Réponse GET /api/messages
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "6883760e3b5b7328e305284b",
      "name": "Jean-Louis",
      "message": "Mon message de test !",
      "createdAt": "2025-07-25T12:18:22.879Z"
    }
  ]
}
```

### Réponse POST /api/messages
```json
{
  "success": true,
  "message": "Message créé avec succès",
  "data": {
    "_id": "6883760e3b5b7328e305284b",
    "name": "Jean-Louis",
    "message": "Mon message de test !",
    "createdAt": "2025-07-25T12:18:22.879Z",
    "updatedAt": "2025-07-25T12:18:22.879Z"
  }
}
```

### Réponse d'erreur
```json
{
  "success": false,
  "message": "Le nom et le message sont requis"
}
```

## 🚀 Script de test automatique

Utilisez le script `test-curl.sh` pour exécuter tous les tests automatiquement :

```bash
./test-curl.sh
```

## 💡 Conseils

1. **Vérifiez que le serveur fonctionne** avant de tester les endpoints
2. **Utilisez `-s` (silent)** pour un affichage plus propre
3. **Utilisez `jq`** pour formater les réponses JSON
4. **Testez les cas d'erreur** pour valider la robustesse de l'API
5. **Vérifiez le tri chronologique** des messages 