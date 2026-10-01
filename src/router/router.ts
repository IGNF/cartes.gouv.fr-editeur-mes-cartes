import { createGroup, createRouter, defineRoute, param } from "type-route";

const appRoot = import.meta.env.BASE_URL;

// Routes non protégées
const publicRoutes = {
    home: defineRoute(`${appRoot}`),
    page_not_found: defineRoute(`/404`),
};

const mapRoutes = {
    // WARNING: Route externe (ne pas utiliser `routes.view_map(id).link`)
    view_map: defineRoute(
        {
            map: param.query.string,
        },
        () => `/voir-une-carte`
    ),
    // WARNING: Route externe (ne pas utiliser `routes.edit_map(id).link`)
    edit_map: defineRoute(
        {
            map: param.path.string,
            organizationId: param.query.optional.string,
        },
        (p) => `/creer-une-carte/${p.map}`
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
