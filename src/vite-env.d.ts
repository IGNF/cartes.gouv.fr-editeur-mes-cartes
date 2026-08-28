/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly APP_ENV: string;
    readonly APP_ROOT_URL: string;
    readonly VITE_OIDC_USE_MOCK: string;
    readonly VITE_DEV_STATIC_ACCESS_TOKEN: string;
    readonly VITE_IAM_URL: string;
    readonly VITE_IAM_REALM: string;
    readonly VITE_IAM_CLIENT_ID: string;
    readonly VITE_IAM_CLIENT_SECRET: string;
    readonly VITE_API_EDITOR_URL: string;
    readonly VITE_EDITOR_URL: string;
    readonly VITE_VIEWER_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
