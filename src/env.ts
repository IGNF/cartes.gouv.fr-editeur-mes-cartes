export const env = import.meta.env as ImportMetaEnv & {
    readonly API_EDITOR_URL?: string;
    readonly APP_ROOT_URL?: string;
};

const dashboardEnv: DashboardEditeurEnv = (typeof window !== "undefined" && window.__DASHBOARD_EDITEUR_ENV) || {};

// Expose les variables d'environnement (permet de les surcharger au déploiement)
export const apiURL = dashboardEnv.apiEditorUrl ?? env.API_EDITOR_URL ?? "";
export const appURL = dashboardEnv.appRootUrl ?? env.APP_ROOT_URL ?? "/";
export const iamClientId = dashboardEnv.iamClientId ?? env.IAM_CLIENT_ID ?? "";
export const iamRealm = dashboardEnv.iamRealm ?? env.IAM_REALM ?? "";
export const iamUrl = dashboardEnv.iamUrl ?? env.IAM_URL ?? "";
