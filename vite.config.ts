import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { oidcSpa } from "oidc-spa/vite-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    envPrefix: ["VITE_", "API_EDITOR_URL", "APP_ROOT_URL", "APP_ENV"],
    plugins: [react(), babel({ presets: [reactCompilerPreset()] }), oidcSpa()],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
