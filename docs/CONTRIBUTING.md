# Contribution

Ce document résume les règles de contribution minimales pour `cartes.gouv.fr-editeur-mes-cartes`, en particulier sur le format des commits.

## Convention de commit du projet

Le projet utilise [`commitlint`](https://commitlint.js.org/) avec la configuration Conventional Commits définie dans [/.commitlintrc.yml](../.commitlintrc.yaml).

Le format attendu est le suivant :

```text
<type>(<scope>): <sujet>
```

Exemples :

```text
feat(map): ajoute la suppression d'une carte
fix(oidc): corrige l'initialisation en environnement qua
docs(readme): documente l'installation locale
refactor(api): simplifie fetchWithAuth
```

Types courants :

- `feat` : ajout de fonctionnalité ;
- `fix` : correction de bug ;
- `docs` : documentation ;
- `refactor` : réorganisation interne sans changement fonctionnel ;
- `test` : ajout ou modification de tests ;
- `build` : dépendances, génération, outillage ;
- `ci` : intégration continue.

## Qu'est-ce que Conventional Commits ?

Conventional Commits est une convention d'écriture des messages de commit. Elle impose une structure simple et normalisée pour rendre l'historique Git plus lisible, faciliter les revues, et permettre à certains outils d'automatiser le changelog ou le versioning.

Dans ce dépôt, cette convention est contrôlée par `commitlint`.

## Installation de commitlint dans le projet

Pour installer `commitlint` au niveau du projet, la commande usuelle est :

## Disposer d'une commande `commit` quel que soit le projet

Afin d'utiliser plus facilement les commitlint, il est possible d'installer globalement ces dépendances :

```bash
npm install -g @commitlint/prompt-cli @commitlint/config-angular
```

Cela permet ensuite d'utiliser directement la commande

```bash
commit
```

pour effectuer un commit avec les bonnes conventions.
