import { defineConfig } from 'orval';

/**
 * Convertit une chaîne en camelCase.
 * Exemple: "get_user_by_id" → "getUserById"
 * 
 * @param value - La chaîne à convertir (peut contenir des tirets, underscores, espaces, etc.)
 * @returns La chaîne convertie en camelCase
 * 
 * Pourquoi ? Les noms des fonctions TypeScript générées doivent être en camelCase
 * pour respecter les conventions JavaScript.
 */
const toCamelCase = (value: string): string => {
  // Diviser la chaîne en parties (en enlevant tout ce qui n'est pas alphanumérique)
  const parts = value
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1));

  // Si pas de parties valides, retourner un nom par défaut
  if (parts.length === 0) {
    return 'operation';
  }

  // Mettre la première lettre en minuscules, et concaténer les autres
  const [first, ...rest] = parts;
  return first[0].toLowerCase() + first.slice(1) + rest.join('');
};

/**
 * Nettoie un nom d'opération pour que ce soit un identifiant TypeScript valide.
 * Supprime les caractères non alphanumériques et s'assure que ça ne commence pas par un chiffre.
 * Exemple: "4e6c_574f" → "op4e6c_574f" (car commence par un chiffre)
 * Exemple: "get-user" → "getUser" (tiret supprimé)
 *
 * TypeScript n'accepte pas les identifiants commençant par un chiffre
 * ou contenant des caractères spéciaux. Cette fonction les corrige.
 * 
 * @param value - Le nom non nettoyé
 * @returns Un identifiant valide en TypeScript
 */
const sanitizeOperationName = (value: string): string => {
  // Remplacer tous les caractères non alphanumériques par des underscores
  const safe = value.replace(/[^a-zA-Z0-9_]/g, '_');
  
  // Supprimer les underscores au début et à la fin
  const trimmed = safe.replace(/^_+|_+$/g, '');

  // Si la chaîne est vide après nettoyage, retourner un nom par défaut
  if (!trimmed) {
    return 'operation';
  }

  // Si ça commence par un chiffre (invalide en TypeScript), préfixer avec "op"
  return /^[0-9]/.test(trimmed) ? `op${trimmed}` : trimmed;
};

/**
 * Applique une convention de nommage selon le verbe HTTP pour éviter les doublons
 * du style getGet..., tout en gardant des noms explicites pour les mutations.
 *
 * @param baseName - Nom de base sans bruit (ex: "apiImageFilename")
 * @param verb - Verbe HTTP de l'opération
 * @returns Nom final de l'opération utilisé par Orval
 */
const applyVerbNaming = (baseName: string, verb: string): string => {
  const cleaned = baseName.replace(/^(get|post|put|patch|delete)/i, '');
  const normalizedBase = sanitizeOperationName(cleaned || 'operation');
  const capitalizedBase = normalizedBase[0].toUpperCase() + normalizedBase.slice(1);

  switch (verb.toLowerCase()) {
    case 'get':
      return normalizedBase;
    case 'post':
      return `create${capitalizedBase}`;
    case 'put':
      return `update${capitalizedBase}`;
    case 'patch':
      return `patch${capitalizedBase}`;
    case 'delete':
      return `delete${capitalizedBase}`;
    default:
      return `${verb.toLowerCase()}${capitalizedBase}`;
  }
};

/**
 * Vérifie si un operationId ressemble à un hash (chaîne non-lisible).
 * Les hashes sont générés automatiquement par Swagger et ne sont pas lisibles.
 * Exemple de hash: "e381179d562ca09a83d431b1dcfe77a5" (32 caractères hexadécimaux)
 * Exemple normal: "getUserById"
 * 
 * On veut ignorer les hashes et générer des noms lisibles à partir
 * de la route et du verbe HTTP plutôt que d'utiliser l'operationId.
 * 
 * @param value - L'operationId à vérifier
 * @returns true si c'est un hash (>24 caractères hexadécimaux), false sinon
 */
const isHashLikeOperationId = (value: string): boolean => /^[0-9a-f]{24,}$/i.test(value);

/**
 * Construit un nom d'opération lisible à partir de la route et du verbe HTTP.
 * Exemple: route="/api/users/{id}", verb="get" → "getApiUsersByIdParams"
 * 
 * Quand l'operationId est un hash, on construit un nom à partir
 * de la structure de la route pour que le code généré soit auto-documenté
 * 
 * @param route - La route API (ex: "/api/users/{id}")
 * @param verb - Le verbe HTTP (ex: "get", "post", "patch")
 * @returns Un nom d'opération lisible et valide en TypeScript
 */
const buildOperationName = (route: string, verb: string): string => {
  // Transformer la route en parties lisibles
  const routePart = route
    .split('/')
    .filter(Boolean) // Enlever les parties vides
    .map((segment) => {
      // Pour les segments de paramètre (ex: {id}), les transformer en "by-id"
      if (segment.startsWith('{') && segment.endsWith('}')) {
        return `by-${segment.slice(1, -1)}`;
      }
      return segment;
    })
    .join('-'); // Joindre avec des tirets

  // Construire d'abord un nom basé sur la route, puis appliquer la convention par verbe HTTP
  const routeBaseName = sanitizeOperationName(toCamelCase(routePart));
  return applyVerbNaming(routeBaseName, verb);
};

export default defineConfig({
  petstore: {
    output: {
      mode: 'tags-split',
      target: 'src/api',
      schemas: 'src/api/model',
      client: 'react-query',
      baseUrl: {
        runtime: 'env.API_EDITEUR_URL',
        imports: [{ name: 'env', importPath: '../env' }],
      },
      mock: true,
      override: {
        /**
         * Personnalise le nom de chaque opération générée.
         * 
         * Stratégie:
         * 1. Si operationId est valide et lisible (pas un hash):
         *    → l'utiliser et le convertir en camelCase
         * 2. Sinon (si c'est un hash):
         *    → générer un nom à partir de la route et du verbe HTTP
         * 
         * Exemple d'entrée:
         *   - operation.operationId: "e381179d562ca09a83d431b1dcfe77a5" (hash)
         *   - route: "/api/users/{id}"
         *   - verb: "get"
         * 
         * Exemple de sortie: "getApiUsersById"
         * 
         * Sans cela, Orval génère des types TypeScript avec des noms invalides
         * comme "4e6c574f04b8d8c4c2b65b6f58a53249200" (commence par un chiffre),
         * ce qui casse la compilation TypeScript.
         */
        operationName: (operation, route, verb) => {
          const operationId = operation.operationId;

          // Cas 1: operationId est valide et lisible (pas un hash)
          if (
            typeof operationId === 'string' &&
            operationId.length > 0 &&
            !isHashLikeOperationId(operationId)
          ) {
            // Même pour un operationId lisible, on normalise par verbe pour éviter getGet...
            return applyVerbNaming(toCamelCase(operationId), verb);
          }

          // Cas 2: operationId est un hash ou invalide → générer depuis la route
          return buildOperationName(route, verb);
        },
        query: {
          usePrefetch: true,
        }
      },
    },
    input: {
      target: './macarte-api.yaml',
    },
  },
});