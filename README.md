# TechStore

## Présentation du projet

TechStore est une application web de gestion des commandes d'un magasin de matériel informatique. Elle permet de consulter les clients, les produits et les commandes à partir de fichiers JSON.

## Technologies utilisées

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- JSON
- Git et GitHub

## Fonctionnalités

- Affichage des indicateurs concernant les clients, les produits et les commandes.
- Calcul du montant total des commandes.
- Recherche des commandes par nom du client.
- Filtrage des commandes par statut.
- Filtrage des commandes par catégorie de produit.
- Combinaison de la recherche et des filtres.
- Consultation des détails d'une commande.
- Chargement des données avec `fetch()` et `async/await`.
- Gestion des erreurs lors du chargement des fichiers JSON.
- Interface responsive adaptée aux différents écrans.

## Structure du projet

    TechStore/
    ├── index.html
    ├── css/
    │   └── style.css
    ├── data/
    │   ├── customers.json
    │   ├── products.json
    │   └── orders.json
    ├── js/
    │   ├── app.js
    │   ├── state.js
    │   ├── dataService.js
    │   ├── selectors.js
    │   └── view.js
    └── README.md

## Organisation du code JavaScript

- `app.js` : initialise l'application et gère les événements.
- `state.js` : conserve les données de l'application.
- `dataService.js` : charge les fichiers JSON et gère les erreurs de chargement.
- `selectors.js` : gère les relations entre les données, la recherche, les filtres et les calculs.
- `view.js` : affiche les indicateurs, les commandes et leurs détails.

## Lancement du projet

1. Télécharger ou cloner le dépôt GitHub.
2. Ouvrir le dossier `TechStore` dans Visual Studio Code.
3. Installer l'extension Live Server si nécessaire.
4. Ouvrir le fichier `index.html` avec Live Server.
5. Tester la recherche, les filtres et les détails des commandes.

## Gestion des versions

Le projet utilise Git pour suivre les modifications du code et GitHub pour héberger le dépôt.

Dépôt GitHub : https://github.com/hibaelouafy832-dotcom/TechStore