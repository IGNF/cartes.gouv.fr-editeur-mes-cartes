import { oidcSpa } from "oidc-spa/react-spa";
import { z } from "zod";

// Inspiré de https://github.com/keycloakify/oidc-spa/blob/main/examples/tanstack-router-file-router/src/oidc.ts

export const { bootstrapOidc, useOidc, getOidc, OidcInitializationGate } = oidcSpa
    // pour le type checking du token décodé, pour le moment pas nécessaire
    .withExpectedDecodedIdTokenShape({
        decodedIdTokenSchema: z.object({
            preferred_username: z.string(),
            email: z.email(),
        }),
        decodedIdToken_mock: {
            preferred_username: "claire.durand",
            email: "claire.durand@ign.fr",
        },
    })
    // Voir : https://docs.oidc-spa.dev/v/v10/features/auto-login#react-spa
    .withAutoLogin() // il faut être connecté pour toute l'application, donc on sera tout de suite redirigé vers la page de login si l'on n'est pas connecté
    .createUtils();

void bootstrapOidc(
    import.meta.env.VITE_OIDC_USE_MOCK === "true"
        ? {
              // Mode mock pour les tests (si jamais) : pas de requêtes à l'iam
              implementation: "mock",
              isUserInitiallyLoggedIn: true,
              // on peut surcharger les données utilisateur ici
          }
        : {
              implementation: "real",
              issuerUri: `${import.meta.env.VITE_IAM_URL}/realms/${import.meta.env.VITE_IAM_REALM}`,
              // issuerUri: "http://localhost:8000",
              clientId: import.meta.env.VITE_IAM_CLIENT_ID,
              debugLogs: import.meta.env.MODE === "development",
          }
);

/**
 * Retourne juste le header Authorization avec le token OIDC
 * Utile pour passer à des requêtes personnalisées
 * Retourne undefined si l'utilisateur n'est pas connecté
 */
export const getAuthHeader = async (): Promise<{ Authorization: string } | undefined> => {
    const oidc = await getOidc();

    if (!oidc.isUserLoggedIn) {
        return undefined;
    }

    const accessToken = await oidc.getAccessToken();
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

/**
 * A convenience wrapper around `fetch()` that automatically
 * attaches the access token as an Authorization header when the user is logged in.
 */
export const fetchWithAuth: typeof fetch = async (input, init) => {
    const oidc = await getOidc();

    if (oidc.isUserLoggedIn) {
        const accessToken = await oidc.getAccessToken();
        const headers = new Headers(init?.headers);
        headers.set("Authorization", `Bearer ${accessToken}`);
        (init ??= {}).headers = headers;
    }

    return fetch(input, init);
};
