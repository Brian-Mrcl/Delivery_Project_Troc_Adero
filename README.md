# 🎭 Troc'Adero

Une plateforme d'échange culturel local permettant aux utilisateurs d'échanger des livres, DVDs, CDs et autres objets culturels.

## 📚 Table des matières
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Fonctionnalités](#-fonctionnalités) 
- [Structure](#-structure)
- [API Routes](#-api-routes)
- [Déploiement](#-déploiement)
- [Contribution](#-contribution)
- [Licence](#-licence)

## 🚀 Technologies

- Next.js 15.3
- React 19
- MongoDB
- NextAuth.js
- TailwindCSS

## ⚙️ Installation

1. **Cloner le repository**
```bash
git clone [votre-repo-url]
cd troc_app
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration des variables d'environnement**

Créer un fichier `.env.local` à la racine :
```bash
MONGODB_URI=votre_uri_mongodb
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=votre_secret
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

## 🌟 Fonctionnalités

- **Authentification**
  - Inscription utilisateur
  - Connexion sécurisée
  - Gestion de session

- **Gestion de profil**
  - Modification des informations personnelles
  - Historique des échanges
  - Préférences utilisateur

- **Catalogue d'objets**
  - Ajout d'objets culturels
  - Recherche multicritères
  - Filtres par catégorie

- **Système d'échange**
  - Propositions d'échange
  - Messagerie intégrée
  - Suivi des échanges

## 🗂️ Structure

```
troc_app/
├── src/
│   ├── pages/         # Routes et pages
│   │   ├── api/      # API Routes
│   │   └── [...auth] # Routes d'authentification
│   ├── components/   # Composants React
│   ├── styles/      # Fichiers CSS
│   └── lib/         # Utilitaires
├── public/          # Assets statiques
└── models/         # Modèles MongoDB
```

## 🔌 API Routes

| Route | Méthode | Description |
|-------|---------|-------------|
| `/api/register` | POST | Inscription utilisateur |
| `/api/auth/*` | * | Routes NextAuth.js |
| `/api/items` | GET/POST | Gestion des objets |
| `/api/exchange` | POST | Création d'échange |

## 🚀 Déploiement

1. **Build du projet**
```bash
npm run build
```

2. **Démarrage en production**
```bash
npm start
```

## 👥 Contribution

Les contributions sont les bienvenues ! Voici comment participer :

1. Fork du projet
2. Création d'une branche (`git checkout -b feature/AmazingFeature`)
3. Commit des changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouverture d'une Pull Request

## 📄 Licence

Ce projet est sous licence GNU General Public License v3.0