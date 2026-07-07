
// TODO : créer les requêtes pour l'API editeur

/**
 * Factory pour créer des query keys pour react-query
 */
const RQKeys = {
    
    user_me: (): string[] => ["user", "me"],
    my_maps: (): string[] => ["user", "me", "maps"],

    alerts: (): string[] => ["alerts"],
};

export default RQKeys;
