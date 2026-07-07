import { createGroup, createRouter, defineRoute, param } from "type-route";

export const appRoot = "";

// Routes non protégées
const publicRoutes = {
    discover_publish: defineRoute(
        {
            authentication_failed: param.query.optional.number,
            session_expired_login_success: param.query.optional.number,
        },
        () => `${appRoot}/publier-une-donnee`
    ),
    page_not_found: defineRoute(`${appRoot}/404`),
    login_disabled: defineRoute(`${appRoot}/connexion-desactivee`),
};

// Chemin vers les sources utiles
const helpRoutes = {
    help_more_info: defineRoute(`${appRoot}/aide/creer-une-carte`),
}

// Routes protégées qui ne sont pas dans des groupes spécifiques plus bas (community, datastore...etc.)
const privateRoutes = {
    // utilisateur
    my_account: defineRoute(`${appRoot}/mon-compte`),
    datastore_selection: defineRoute(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(20),
            search: param.query.optional.string.default(""),
        },
        () => `${appRoot}/tableau-de-bord/entrepots`
    ),
    my_maps: defineRoute(`${appRoot}/mes-cartes`),
};

const communityRoute = defineRoute(
    {
        communityId: param.path.string,
    },
    (p) => `${appRoot}/tableau-de-bord/communaute/${p.communityId}`
);
const communityRoutes = {
    community_info: communityRoute.extend(""),
    // Liste des membres d'une communaute
    members_list: communityRoute.extend(
        {
            userId: param.query.optional.string,
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(20),
            search: param.query.optional.string.default(""),
        },
        () => "/membres"
    ),
};


const routeDefs = {
    ...publicRoutes,
    ...privateRoutes,
    ...communityRoutes,
    ...helpRoutes,
};
export const { RouteProvider, useRoute, routes, session } = createRouter(routeDefs);

export const knownRoutes = Object.values(routes).map((r) => r.name);
export const publicGroup = createGroup((Object.keys(publicRoutes) as (keyof typeof publicRoutes)[]).map((key) => routes[key]));
export const privateGroup = createGroup((Object.keys(privateRoutes) as (keyof typeof privateRoutes)[]).map((key) => routes[key]));
export const communityGroup = createGroup((Object.keys(communityRoutes) as (keyof typeof communityRoutes)[]).map((key) => routes[key]));

export const groups = {
    public: publicGroup,
    private: privateGroup,
    community: communityGroup,
};