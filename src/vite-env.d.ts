/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_ENV: string;
    readonly APP_ROOT_URL: string;
    readonly VITE_OIDC_USE_MOCK: string;
    readonly IAM_URL: string;
    readonly IAM_REALM: string;
    readonly IAM_CLIENT_ID: string;
    readonly VITE_API_EDITOR_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

// Pour éviter les erreurs typescripts
interface DashboardEditeurEnv {
    readonly iamUrl?: string;
    readonly iamRealm?: string;
    readonly iamClientId?: string;
    readonly appRootUrl?: string;
    readonly apiEditorUrl?: string;
}

interface Window {
    readonly __DASHBOARD_EDITEUR_ENV?: DashboardEditeurEnv;
}
