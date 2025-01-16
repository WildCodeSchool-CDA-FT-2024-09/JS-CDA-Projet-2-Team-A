# Stock Manage 📦

**Stock Manage** est une solution dédiée à la gestion efficace des stocks, en répondant aux besoins spécifiques des différentes équipes impliquées dans le processus : achats, approvisionnement, atelier, et administration.

---

## Fonctionnalités par Équipe

### 1. **Équipe des Achats** 🛒

#### **Responsabilités** :
- Contact avec les fournisseurs pour passer les commandes de produits.

#### **Exigences Fonctionnelles** :
- **Accès aux délais fournisseurs** : Visualisation des délais de livraison des fournisseurs pour mieux estimer l'arrivée des commandes.
- **Alertes sur stocks faibles** : Notifications automatiques lorsque les niveaux de stock atteignent un seuil minimum, ajustable en fonction de l'utilisation hebdomadaire.
- **Gestion de la liste des produits** : Capacité à créer, modifier et désactiver temporairement des produits (suppression interdite).
- **Gestion de la liste des fournisseurs** : Possibilité de gérer les fournisseurs, y compris les marquer comme inactifs, sans les supprimer.

---

### 2. **Équipe de l'Approvisionnement** 🚚

#### **Responsabilités** :
- Réception des commandes et mise à jour des niveaux de stock.

#### **Exigences Fonctionnelles** :
- **Mise à jour des stocks** : Ajustement des niveaux de stock lors de la réception des commandes.
- **Alertes pour commandes incomplètes** : Possibilité de notifier l’équipe des Achats en cas de commandes incomplètes ou d’erreurs sur les quantités reçues.
- **Visibilité des commandes** : Accès à l’historique des commandes pour vérifier le statut global ou par produit, facilitant la validation des livraisons.

---

### 3. **Équipe de l'Atelier** 🛠️

#### **Responsabilités** :
- Gestion de la distribution des produits vers les différentes unités de l'atelier.

#### **Exigences Fonctionnelles** :
- **Gestion des inventaires** : Mise à jour des quantités en stock lorsque les produits sont expédiés aux unités d'atelier.
- **Formulaires de sortie de matériel** : Émission de documents enregistrant les articles distribués.
- **Contact direct avec l’équipe des Achats** : Moyens de communication pour des besoins urgents, des demandes spéciales ou des mises à jour sur des exigences exceptionnelles.

---

### 4. **Administrateur** 🛡️

#### **Responsabilités** :
- Gestion des comptes utilisateur et des permissions.

#### **Exigences Fonctionnelles** :
- **Création et suppression de comptes utilisateur** : Ajouter de nouveaux utilisateurs ou désactiver des comptes obsolètes.
- **Gestion des rôles et permissions** : Assigner ou modifier les permissions des utilisateurs en fonction de leurs rôles (Achats, Approvisionnement, Atelier).
- **Vue globale des activités utilisateur** : Accès à un journal d’audit pour surveiller les activités critiques et assurer la sécurité du système.

---

## Palette de couleurs 🎨


---
- [@Pascal](https://github.com/Pas-nou)
- [@Martin](https://github.com/scyanth)
- [@Stephanie](https://github.com/brewost)
- [@Jean-Francois HAFID](https://github.com/YOUNS28100)

## Technologie utilisée 🚀

#### Côté client
![NODE](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)
![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Material UI](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)

#### Côté server
![GraphQL](https://img.shields.io/badge/GraphQl-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![TYPEORM](https://img.shields.io/badge/typeorm-FE0803?style=for-the-badge&logo=typeorm&logoColor=white)
![Apollo GraphQL](https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![DOCKER](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![NGINX](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)

#### Outils de tests
![JEST](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![VITEST](http://img.shields.io/badge/Vitest-%236E9F18?style=for-the-badge&logo=Vitest&logoColor=%23fcd703)

#### Base de données utilisées
![SQLITE](https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![POSTGRESQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

#### Outils externes
![GIT](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![FIGMA](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

---

## Installation & Utilisation

### Pré-requis pour Windows
Configurez **git** pour éviter des problèmes liés aux formats de nouvelle ligne :
```bash
git config --global core.eol lf
git config --global core.autocrlf false
```

#### Clonage du repo
Clônez le projet sur votre machine
```bash
git clone git@github.com:WildCodeSchool-CDA-FT-2024-09/JS-CDA-Projet-2-Team-A.git
```

Depuis la branche main et positionner à la racine du projet, veuillez installer les dépendances dans chaque section (root, client, server).
```bash
npm install
```
```bash
cd client && npm install
```
```bash
cd server && npm install
```
<h3 style="color:#F45156">Créez vos fichiers .env dans le client et le server depuis chaque examples (.env.sample)</h3>


Ensuite, vous pourrez lancer votre client et votre serveur distinctement ou parallèlement à la racine.
```bash
npm run dev-front
npm run dev-back
```

Depuis votre dossier client, veuillez générer votre fichier graphql-types via la commande suivante :
```bash
npm run codegen
```

### ENJOY !