/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_OIDC_USE_MOCK: string
  readonly VITE_IAM_URL: string
  readonly VITE_IAM_REALM: string
  readonly VITE_IAM_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
