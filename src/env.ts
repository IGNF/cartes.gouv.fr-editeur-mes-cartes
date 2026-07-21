const rootDataset = (document.getElementById("root") as HTMLDivElement | null)?.dataset;
export const env = import.meta.env as ImportMetaEnv & {
	readonly API_EDITOR_URL?: string;
};

export const apiURL = rootDataset?.["apiURL"] ?? env.VITE_API_EDITOR_URL ?? env.API_EDITOR_URL ?? "";