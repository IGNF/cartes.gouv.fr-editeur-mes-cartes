# Espace utilisateur de l'éditeur carto

`cartes.gouv.fr-editeur-mes-cartes` est l'interface utilisateur dédiée à la gestion des cartes d'un·e utilisateur·ice dans l'écosystème cartes.gouv.fr. Le projet couvre aujourd'hui la gestion des cartes, des médias (images de l'utilisateur·ice), aux notifications et aux organisations.

L'application s'inscrit dans l'écosystème [cartes.gouv.fr](https://cartes.gouv.fr) et est notamment liée à :

- [cartes.gouv.fr-editeur-carto](https://github.com/IGNF/cartes.gouv.fr-editeur-carto) : éditeur cartographique utilisé pour créer ou modifier le contenu d'une carte.
- [cartes.gouv.fr-visionneuse-carto](https://github.com/IGNF/cartes.gouv.fr-visionneuse-carto) : visionneuse utilisée pour afficher une carte publiée ou partagée.

Ce dépôt vient s'ajouter à l'espace utilisateur global de cartes.gouv.fr.

## Installation

### Prérequis

- Node.js `^22.18.0 || >=24.0.0`
- npm

### Installation locale

```bash
npm install
```

Créer ou adapter le fichier `.env.local` à la racine du projet. Les variables les plus importantes sont :

```dotenv
API_EDITOR_URL=https://url.to/api/
VITE_IAM_URL=https://url.to/sso
VITE_IAM_REALM=geoplateforme
VITE_IAM_CLIENT_ID=client_oidc
VITE_EDITOR_URL=https://url.to/editor
VITE_VIEWER_URL=https://url.to/viewer
```

Lancer le projet en local :

```bash
npm run dev
```

Le serveur Vite est alors disponible sur l'URL locale affichée dans le terminal.

### Commandes utiles

```bash
npm run dev
npm run build
npm run lint
npm run generate-api
```

- `npm run dev` : démarre l'application en mode développement.
- `npm run build` : lance le build TypeScript puis le bundle Vite.
- `npm run lint` : exécute ESLint sur le code source.
- `npm run generate-api` : régénère le client API, les types et les mocks à partir du contrat OpenAPI.

## Documentation développeur

Voir [DEVELOPER.MD](./docs/DEVELOPER.md).

## Projet github liés

- [Projet github cartes.gouv.fr](https://github.com/IGNF/cartes.gouv.fr)
- [Projet github cartes.gouv.fr-editeur-carto](https://github.com/IGNF/cartes.gouv.fr-editeur-carto)
- [Projet github cartes.gouv.fr-visionneuse-carto](https://github.com/IGNF/cartes.gouv.fr-visionneuse-carto)
