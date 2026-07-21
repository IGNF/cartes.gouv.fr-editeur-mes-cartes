# Documentation développeur·euse

## Stack principale

### Dépendances cœur

Le projet s'appuie notamment sur [React](https://react.dev/) et [Vite](https://vite.dev/), ainsI que :

- [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview) : couche de chargement et de cache des données distantes. Le projet l'utilise pour piloter les requêtes API, les mutations et la persistance locale du cache.
- [Orval](https://orval.dev/) : génération du client API TypeScript/React Query à partir du contrat OpenAPI [`editeur-api.yaml`](./editeur-api.yaml), directement déduit de l'API de l'éditeur carto (actuellement API MaCarte). Il produit les hooks, les types et les mocks de base dans [`src/api`](./src/api).
- [oidc-spa](https://docs.oidc-spa.dev/) : intégration OIDC côté SPA. La bibliothèque gère la connexion, le bootstrap de session et l'obtention des tokens pour les appels authentifiés. Dans notre cas, l'utilisateur est toujours authentifié. La connexion se fait uniquement via le SSO de la géoplateforme.

### Dépendances de support

- [TypeScript](https://www.typescriptlang.org/) : typage statique du projet.
- [react-dsfr](https://github.com/codegouvfr/react-dsfr) : implémentation en React du DSFR (Système de Design de l’État).
- [MSW](https://mswjs.io/) et [faker](https://fakerjs.dev/) : génération et interception de données simulées pour le développement et les tests de flux front (*N.B. : pas encore mis en place, mais disponible via Orval*).
- [type-route](https://type-route.zilch.dev/) : routage typé de l'application.

## Organisation technique

- L'entrée applicative est [`src/main.tsx`](./src/main.tsx). Elle initialise React, le DSFR et la porte d'initialisation OIDC.
- Le composant racine [`src/App.tsx`](./src/App.tsx) configure TanStack Query, la persistance du cache et le rendu du routeur.
- Le routage est défini dans [`src/router/router.ts`](./src/router/router.ts) avec `type-route`.
- L'authentification OIDC est centralisée dans [`src/oidc.ts`](./src/oidc.ts).
- L'API générée est regroupée dans [`src/api`](./src/api), avec un découpage par domaines fonctionnels.

## Cycle de travail recommandé

1. Modifier le contrat OpenAPI si l'API change.
2. Lancer `npm run generate-api` pour régénérer les hooks et modèles.
3. Adapter les pages ou composants qui consomment les nouveaux hooks.
4. Vérifier le lint et le build avant de pousser les changements.

## Authentification et appels API

L'application utilise `oidc-spa` pour gérer la session de l'utilisateur. Les requêtes API passent ensuite par [`src/api/fetchWithAuth.ts`](./src/api/fetchWithAuth.ts), qui ajoute le token d'accès quand l'utilisateur est connecté.

## Données simulées et mocks

Le projet contient déjà une base de mocks générés par Orval dans [`src/api`](./src/api) :

- `*.faker.ts` : fabriques de données simulées.
- `*.msw.ts` : handlers MSW permettant d'intercepter les appels HTTP.

Ces fichiers ne sont actuellement pas utilisés, mais pourront l'être pour effectuer des tests.

## Documentation complémentaire

Le dossier [`docs`](./docs) contiendra la documentation interne du projet. Il pourra être enrichi par la suite avec toute information complémentaire intéressante.

## Arborescence du projet

```text
.
├── docs/                  Documentation projet
├── public/                Assets servis tels quels par Vite
├── src/
│   ├── api/               Client API généré par Orval, types, mocks et mutateur HTTP
│   ├── components/        Composants UI réutilisables
│   ├── hooks/             Hooks React métier
│   ├── i18n/              Configuration d'internationalisation
│   ├── modules/           Modules transverses, dont la configuration Query Client
│   ├── pages/             Pages applicatives
│   ├── router/            Définition des routes et rendu de navigation
│   ├── sass/              Styles globaux et helpers SCSS
│   ├── utils/             Utilitaires divers
│   ├── App.tsx            Composition racine de l'application
│   ├── main.tsx           Point d'entrée React/Vite
│   └── oidc.ts            Initialisation OIDC et gestion du token
├── macarte-api.yaml       Contrat OpenAPI de l'API MaCarte
├── orval.config.ts        Configuration de génération du client API
├── vite.config.ts         Configuration Vite
└── package.json           Dépendances et scripts npm
```

## Points d'attention

- Les fichiers générés par Orval dans [`src/api`](./src/api) peuvent être écrasés lors d'une régénération.
- Les variables d'environnement OIDC et API conditionnent directement le bon fonctionnement de l'application locale.

## Références utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/guide/)
- [Documentation TanStack Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Documentation Orval](https://orval.dev/overview)
- [Documentation oidc-spa](https://docs.oidc-spa.dev/)
- [Projet github cartes.gouv.fr](https://github.com/IGNF/cartes.gouv.fr)
- [Projet github cartes.gouv.fr-editeur-carto](https://github.com/IGNF/cartes.gouv.fr-editeur-carto)
- [Projet github cartes.gouv.fr-visionneuse-carto](https://github.com/IGNF/cartes.gouv.fr-visionneuse-carto)