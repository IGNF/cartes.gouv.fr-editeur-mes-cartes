import { createGroup, createRouter, defineRoute, param } from "type-route";

export const appRoot = "";

// Routes non protégées
const publicRoutes = {
    home: defineRoute(`${appRoot}/`),
    dashboard: defineRoute(`/`),
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

const mapRoutes = {
    view_map: defineRoute(
        {
            mapId: param.path.string
        },
        (p) => `${appRoot}/voir-une-carte/${p.mapId}`
    ),
    edit_map: defineRoute(
        {
            mapId: param.path.string
        },
        (p) => `${appRoot}/creer-une-carte/${p.mapId}`
    ),

    map_list: defineRoute(
        {
            page: param.query.optional.number.default(1),
            offset: param.query.optional.number.default(0),
            limit: param.query.optional.number.default(10),
            query: param.query.optional.string,
            theme: param.query.optional.string.default(""),
        },
        () => "/mes-cartes"
    ),
    create_map: defineRoute(`${appRoot}/creer-une-carte`),
}

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
};

const routeDefs = {
    ...publicRoutes,
    ...privateRoutes,
    ...helpRoutes,
    ...mapRoutes
};
export const { RouteProvider, useRoute, routes, session } = createRouter(routeDefs);

export const knownRoutes = Object.values(routes).map((r) => r.name);
export const publicGroup = createGroup((Object.keys(publicRoutes) as (keyof typeof publicRoutes)[]).map((key) => routes[key]));
export const privateGroup = createGroup((Object.keys(privateRoutes) as (keyof typeof privateRoutes)[]).map((key) => routes[key]));
export const mapGroup = createGroup((Object.keys(mapRoutes) as (keyof typeof mapRoutes)[]).map((key) => routes[key]));

export const groups = {
    public: publicGroup,
    private: privateGroup,
    map: mapGroup
};

export const useRoutePaginationParams = () => {
    const route = useRoute();
    const page = route.params?.["page"] ?? 1;
    const limit = route.params?.["limit"] ?? 10;

    return { page, limit };
};
