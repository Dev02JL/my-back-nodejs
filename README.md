# Backend Messages - Node.js + MongoDB

Une API REST simple pour gérer des messages avec Node.js, Express et MongoDB.

## 🚀 Installation

1. **Cloner le projet :**
```bash
git clone git@github.com:Dev02JL/my-back-nodejs.git
cd my-back-nodejs
```

2. **Installer les dépendances :**
```bash
npm install
```

3. **Configuration de l'environnement :**
Créez un fichier `.env` à la racine du projet avec le `.env.exemple`

4. **Base de données :**
L'application utilise MongoDB Atlas (cloud). Aucune installation locale de MongoDB n'est nécessaire.

5. **Lancer le serveur :**
```bash
# Mode développement (avec nodemon)
npm run dev

# Mode production
npm start
```

## 📡 API Endpoints

### GET /api/messages
Récupère tous les messages triés du plus récent au plus ancien.

**Réponse :**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Jean",
      "message": "Bonjour tout le monde !",
      "createdAt": "2023-09-06T10:30:00.000Z"
    },
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
      "name": "Marie",
      "message": "Salut !",
      "createdAt": "2023-09-06T09:15:00.000Z"
    }
  ]
}
```

### POST /api/messages
Crée un nouveau message.

**Corps de la requête :**
```json
{
  "name": "Jean",
  "message": "Bonjour tout le monde !"
}
```

**Réponse :**
```json
{
  "success": true,
  "message": "Message créé avec succès",
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
          "name": "Jean",
      "message": "Bonjour tout le monde !",
      "createdAt": "2023-09-06T10:30:00.000Z"
  }
}
```

## 🗄️ Modèle de données

### Message
- `name` (String, requis) : Nom de l'utilisateur
- `message` (String, requis) : Contenu du message
- `createdAt` (Date, auto-générée) : Date de création (ajoutée automatiquement par Mongoose)
- `updatedAt` (Date, auto-générée) : Date de dernière modification (ajoutée automatiquement par Mongoose)

## 🛠️ Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **CORS** - Middleware pour les requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

## 📁 Structure du projet

```
BackNodejs/
├── config/
│   └── database.js      # Configuration MongoDB
├── models/
│   └── Message.js       # Modèle Message
├── routes/
│   └── messages.js      # Routes API
├── server.js            # Serveur principal
├── package.json         # Dépendances
└── README.md           # Documentation
```

## 🔧 Scripts disponibles

- `npm start` : Démarre le serveur en mode production
- `npm run dev` : Démarre le serveur en mode développement avec nodemon 