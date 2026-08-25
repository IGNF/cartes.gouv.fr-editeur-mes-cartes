// TODO : créer les requêtes pour l'API editeur

/**
 * Factory pour créer des query keys pour react-query
 */
const RQKeys = {
    user_me: (): string[] => ["user", "me"],
    map_list: (): string[] => ["user", "me", "maps"],
    maps: (params?: unknown): unknown[] => ["maps", params ?? null],
    map_view: (viewId: string): string[] => ["maps", "view", viewId],
    map_file: (viewId: string): string[] => ["maps", "file", viewId],

    organizations_me: (): string[] => ["organizations", "me"],
    organizations_roles: (): string[] => ["organizations", "roles"],
    organization: (organizationId: string): string[] => ["organizations", organizationId],

    themes: (): string[] => ["themes"],

    medias: (params?: unknown): unknown[] => ["medias", params ?? null],
    image: (fileName?: string): (string | null)[] => ["image", fileName ?? ""],
    media_folders: (organizationId?: string): (string | null)[] => ["medias", "folders", organizationId ?? null],

    alerts: (): string[] => ["alerts"],
};

export default RQKeys;
