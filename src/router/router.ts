import { createGroup, createRouter, defineRoute, param } from "type-route";
import { appURL as appRoot } from "@/env";

// Routes non protégées
const publicRoutes = {
    home: defineRoute(`${appRoot}`),
    dashboard: defineRoute(`/`),
    discover_publish: defineRoute(
        {
            authentication_failed: param.query.optional.number,
            session_expired_login_success: param.query.optional.number,
        },
        () => `/publier-une-donnee`
    ),
    page_not_found: defineRoute(`/404`),
    login_disabled: defineRoute(`/connexion-desactivee`),
};

const mapRoutes = {
    view_map: defineRoute(
        {
            mapId: param.path.string,
        },
        (p) => `/voir-une-carte/${p.mapId}`
    ),
    edit_map: defineRoute(
        {
            mapId: param.path.string,
            organizationId: param.query.optional.string,
        },
        (p) => `/creer-une-carte/${p.mapId}`
    ),

    map_list: defineRoute(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(10),
            search: param.query.optional.string,
            organizationId: param.query.optional.string,
            theme: param.query.optional.string.default(""),
        },
        () => [`${appRoot}/cartes`]
    ),
    create_map: defineRoute(`/creer-une-carte`),
};

const mediaRoutes = {
    media_list: defineRoute(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(10),
            search: param.query.optional.string,
        },
        () => [`${appRoot}/images`]
    ),
};

const organizationRoute = defineRoute(
    {
        organizationId: param.path.string,
    },
    (p) => [`${appRoot}/equipes/${p.organizationId}`]
);

const organizationRoutes = {
    organization_list: defineRoute(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(10),
            search: param.query.optional.string,
        },
        () => [`${appRoot}/equipes`]
    ),
    organization_maps: organizationRoute.extend(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(10),
            search: param.query.optional.string,
            theme: param.query.optional.string.default(""),
        },
        () => ["/cartes"]
    ),
    organization_members: organizationRoute.extend(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(20),
            search: param.query.optional.string,
        },
        () => ["/membres"]
    ),
    organization_info: organizationRoute.extend("/infos"),
};

// Chemin vers les sources utiles
const helpRoutes = {
    help_more_info: defineRoute(`/aide/creer-une-carte`),
};

// Routes protégées qui ne sont pas dans des groupes spécifiques plus bas (community, datastore...etc.)
const privateRoutes = {
    // utilisateur
    datastore_selection: defineRoute(
        {
            page: param.query.optional.number.default(1),
            limit: param.query.optional.number.default(20),
            search: param.query.optional.string.default(""),
        },
        () => `/tableau-de-bord/entrepots`
    ),
};

const routeDefs = {
    ...publicRoutes,
    ...privateRoutes,
    ...helpRoutes,
    ...mapRoutes,
    ...mediaRoutes,
    ...organizationRoutes,
};
export const { RouteProvider, useRoute, routes, session } = createRouter(routeDefs);

export const knownRoutes = Object.values(routes).map((r) => r.name);
export const publicGroup = createGroup((Object.keys(publicRoutes) as (keyof typeof publicRoutes)[]).map((key) => routes[key]));
export const privateGroup = createGroup((Object.keys(privateRoutes) as (keyof typeof privateRoutes)[]).map((key) => routes[key]));
export const mapGroup = createGroup((Object.keys(mapRoutes) as (keyof typeof mapRoutes)[]).map((key) => routes[key]));
export const mediaGroup = createGroup((Object.keys(mediaRoutes) as (keyof typeof mediaRoutes)[]).map((key) => routes[key]));
export const organizationGroup = createGroup((Object.keys(organizationRoutes) as (keyof typeof organizationRoutes)[]).map((key) => routes[key]));

export const groups = {
    public: publicGroup,
    private: privateGroup,
    map: mapGroup,
    media: mediaGroup,
    organization: organizationGroup,
};

export const useRoutePaginationParams = () => {
    const route = useRoute();
    const page = route.params?.["page"] ?? 1;
    const limit = route.params?.["limit"] ?? 10;

    return { page, limit };
};
