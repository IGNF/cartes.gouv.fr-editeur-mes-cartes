const rootDataset = (document.getElementById("root") as HTMLDivElement | null)?.dataset;
export const env = import.meta.env as ImportMetaEnv & {
	API_EDITEUR_URL?: string;
};

export const apiURL = rootDataset?.["apiURL"] ?? env.VITE_API_EDITEUR_URL ?? env.API_EDITEUR_URL ?? "";