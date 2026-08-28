const rootDataset = (document.getElementById("root") as HTMLDivElement | null)?.dataset;
export const env = import.meta.env as ImportMetaEnv & {
    readonly API_EDITOR_URL?: string;
    readonly APP_ROOT_URL?: string;
};

export const apiURL = rootDataset?.["apiURL"] ?? env.VITE_API_EDITOR_URL ?? env.API_EDITOR_URL ?? "";
export const appURL = rootDataset?.["APP_ROOT_URL"] ?? env.VITE_APP_ROOT_URL ?? env.APP_ROOT_URL ?? "/";
