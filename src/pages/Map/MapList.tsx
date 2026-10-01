import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Pagination from "@codegouvfr/react-dsfr/Pagination";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import SelectNext from "@codegouvfr/react-dsfr/SelectNext";
import { useEffect, useState } from "react";

import { useToggle } from "@mantine/hooks";
import { useTranslation } from "@/i18n";
import { api } from "@/api";
import { routes, useRoute } from "@/router/router";
import { useFakePagination } from "@/hooks/usePagination";
import { tss } from "tss-react";
import MapItem from "./MapItem";
import Skeleton from "@/components/Utils/Skeleton";
import { ListHeader } from "@/components/Layout/ListHeader";
// import { usePrefetchQuery } from "@tanstack/react-query";
// import RQKeys from "@/modules/maps/RQKeys";
import { BadRequestResponse, MapAdd, MapResearchItem, NotConnectedResponse, NotFoundResponse } from "@/api/model";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { createPortal } from "react-dom";
import TextCopyToClipboard from "@/components/Utils/TextCopyToClipboard";
import { useMapIframe, useMapLink } from "@/hooks/useShareMap";
import NoMap from "./NoMap";
import { UserRole } from "@/types/UserRole";
import type { Route } from "type-route";
// import { useEditorUser } from "@/hooks/useEditorUser";
import { useOrganizationMaps } from "@/hooks/useOrganizationMaps";
import { ShareDefinition } from "../Media/ShareDefinition";
import { externalUrls } from "@/router/externalUrls";
import { PostMapMutationVariables, postMapResponse } from "@/api/map/map";
import { UseMutationResult } from "@tanstack/react-query";
import Alert from "@codegouvfr/react-dsfr/Alert";

// TODO : implémenter organisations (en décommentant lignes)

type MutationPostMap = UseMutationResult<postMapResponse, NotFoundResponse | NotConnectedResponse | BadRequestResponse, PostMapMutationVariables, void>;

/**
 * Élément dans l'URL de recherche
 */
type MapRouteParams = {
    page: number;
    limit: number;
    theme: string;
    search: string;
    organizationId?: string; // Seulement dans le cas de l'équipe
};

type MapListProps = {
    organizationId?: string;
    role?: UserRole;
};

// type canDeleteProps = {
//     map: MapResearchItem;
//     user?: UserView;
//     role?: UserRole;
//     organizationId?: string;
// };

// Modales
const confirmDeleteMapModal = createModal({
    id: "confirm-delete-map-modal",
    isOpenedByDefault: false,
});

const shareMapModal = createModal({
    id: "share-map-modal",
    isOpenedByDefault: false,
});

/**
 * Permet de choisir la bonne route selon l'endroit où se situe le composant
 * (Soit cartes d'un espace de travail, soit cartes personnels)
 */
function getMapListRoute(route: Route<typeof routes>, params: MapRouteParams) {
    const queryParams = {
        page: params.page,
        limit: params.limit,
        search: params.search || undefined,
        theme: params.theme || undefined,
    };

    if (route.name === "organization_maps") {
        return routes.organization_maps({
            ...queryParams,
            organizationId: route.params.organizationId,
        });
    }

    return routes.map_list(queryParams);
}

/**
 * Permet de récupérer les paramètres dans l'URL
 */
function useMapRouteParams(): MapRouteParams {
    // Ajouter ici les différents paramètres dans l'URL
    const route = useRoute();
    const page = route.params?.["page"] ?? 1;
    const limit = parseInt(route.params?.["limit"]) ?? 10;
    const theme = route.params?.["theme"] ?? "";
    const search = route.params?.["search"] ?? "";
    const organizationId = route.params?.["organizationId"] ?? undefined;

    return { page, limit, theme, search, organizationId };
}

/**
 * Définit si un utilisateur peut supprimer une carte.
 * Cela est le cas si l'une des conditions suivantes est respectée :
 * - La carte appartient seulement à l'utilisateur, pas à une équipe;
 * - La carte est dans une équipe et a les droits admin sur l'équipe;
 * - La carte est dans une équipe, l'utilisateur a les droits
 * d'édition sur l'équipe ET la carte lui appartient;
 */
// function canDelete(props: canDeleteProps): boolean {
//     const { role, map, organizationId, user } = props;
//     const isNotOrganisation = !organizationId;
//     const isOwner = organizationId && role === UserRole.OWNER;
//     const isEditorAndAuthor = organizationId && role === UserRole.EDITOR && map.user_id === user?.public_id;
//     return !!(isNotOrganisation || isOwner || isEditorAndAuthor);
// }

/**
 * Fonction permettant de transformer un objet de recherche en objet à copier
 * @param map Objet à copier
 * @returns Objet copié
 */
function toMapAdd(map: MapResearchItem): MapAdd {
    if (map.theme_id === null) {
        throw new Error("La carte doit avoir un thème");
    }

    return {
        title: `${map.title} (copie)`,
        description: map.description,
        theme_id: map.theme_id,
        type: map.type,
        premium: map.premium ?? "default",
        active: map.active,
        share: map.share,
        bbox: map.bbox,
        img_url: map.img_url,
        organization_id: map.organization_id ?? undefined,
    };
}

/**
 * Copie une carte.
 * @param map Carte à copier
 * @param mutation Mutation à utiliser pour envoyer la requête
 * @returns Vrai s'il n'y a pas eu d'erreur, faux sinon
 */
const onCopyClick = async (map: MapResearchItem, mutation: MutationPostMap) => {
    if (!map.edit_id) {
        return false;
    }

    const response = await api.map.getMapFileByEditId(map.edit_id);

    if (response.status !== 200) {
        return false;
    }

    const mapObject = toMapAdd(map);

    await mutation.mutateAsync({
        data: {
            carte: mapObject,
            file: new Blob([JSON.stringify(response.data)], { type: "application/json" }),
        },
    });

    return true;
};

export default function MapList({ role }: MapListProps) {
    // Traduction
    const { t } = useTranslation("Map");
    const { t: tCommon } = useTranslation("Common");

    // React states
    const [openedMap, setOpenedMap] = useState<MapResearchItem>();
    const [mapCount, setMapCount] = useState(0);

    // Appelé plus tard dans la modale
    const deleteMapMutation = api.map.useDeleteMapByEditId({
        mutation: {
            onSuccess: () => {
                // TODO : AFFICHER MESSAGE VALIDATION ?
                void refetch();
            },
            onError: (error) => {
                // TODO : AFFICHER MESSAGE ERREUR ?
                console.error(error);
            },
            onMutate: () => {
                // TODO : FERMER LA MODALE ET AFFICHER MESSAGE IN PROGRESS ?
                confirmDeleteMapModal.close();
            },
        },
    });

    // Appelé lors de la copie d'une carte
    const copyMapMutation = api.map.usePostMap({
        mutation: {
            onSuccess: () => {
                // TODO : AFFICHER MESSAGE VALIDATION ?
                void refetch();
            },
            onError: (error) => {
                // TODO : AFFICHER MESSAGE ERREUR ?
                console.error(error);
            },
            onMutate: () => {
                // TODO : FERMER LA MODALE ET AFFICHER MESSAGE IN PROGRESS ?
                confirmDeleteMapModal.close();
            },
        },
    });

    // const confirmCopyMutation = useMutation();
    // Param dans l'URL
    const routeParams = useMapRouteParams();
    const offset = (routeParams.page - 1) * routeParams.limit;
    const organizationId = routeParams.organizationId;

    // const user = useEditorUser();
    const route = useRoute();

    // Envoi deux requêtes dans le cas d'une équipe
    const {
        data: mapsResponse,
        dataUpdatedAt,
        isFetching,
        isLoading,
        refetch,
    } = useOrganizationMaps(role, organizationId, { ...routeParams, query: routeParams.search, offset: offset });

    // const context = role === UserRole.MEMBER ? "organization" : "profile";
    // const context = "profile";

    // Va chercher les cartes de la page d'après
    // TODO : Permettre le prefetch pour aller chercher les cartes d'après
    // const nextPageOffset = routeParams.page * routeParams.limit;
    // usePrefetchQuery({
    //     queryKey: RQKeys.maps({ ...routeParams, query: routeParams.search, offset: nextPageOffset, context: context, organization: organizationId }),
    //     queryFn: ({ signal }) =>
    //         api.map.getMaps({ ...routeParams, query: routeParams.search, offset: nextPageOffset, context: context, organization: organizationId }, { signal }),
    // });

    const { data: themesResponse } = api.theme.useGetThemes({
        query: {
            // Évite les erreurs typescript en vérifiant le bon retour
            select: (response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return undefined;
                }
            },
        },
    });

    const themes = themesResponse || [];

    // Cartes et nombre total de cartes
    const maps = mapsResponse?.maps ?? [];

    useEffect(() => {
        if (mapsResponse?.count !== undefined) {
            setMapCount(mapsResponse.count);
        }
    }, [mapsResponse?.count]);

    // Permet d'activer / désactiver l'affichage des filtres
    const [showFilters, toggleShowFilters] = useToggle();

    // Nombre de page total
    const { totalPages } = useFakePagination(mapCount, routeParams.limit);

    // Pour classes css
    const { classes, cx } = useStyles();

    // Pour voir si on affiche les filtres ou pas
    const hasFilters = themes.length > 1;

    return (
        <>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", organizationId ? "fr-mb-4v" : "fr-mb-8v")}>
                <div
                    className={fr.cx("fr-col-12", "fr-py-0")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <strong className={fr.cx("fr-text--xl", "fr-m-0", "fr-mr-2v")}>{t("maps")}</strong>
                    <Badge severity="info" noIcon={true}>
                        {mapCount}
                    </Badge>
                    {role !== UserRole.MEMBER && (
                        <Button
                            linkProps={{
                                href: externalUrls.create_map,
                            }}
                            iconId="fr-icon-add-line"
                            iconPosition="right"
                            className={fr.cx("fr-ml-auto")}
                        >
                            {t("create-map")}
                        </Button>
                    )}
                </div>
            </div>

            {organizationId && <ShareDefinition />}

            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-2v")}>
                <div
                    className={fr.cx("fr-col-12")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: fr.spacing("4v"),
                    }}
                >
                    <SearchBar
                        label={tCommon("search")}
                        onButtonClick={(text) => {
                            if (!isLoading) {
                                getMapListRoute(route, { ...routeParams, search: text, page: 1 }).push();
                            }
                        }}
                        allowEmptySearch={true}
                        renderInput={(props) => <input {...props} disabled={isLoading} />}
                        defaultValue={routeParams.search}
                    />
                    {hasFilters && (
                        <Button priority="secondary" iconId="fr-icon-equalizer-line" onClick={() => toggleShowFilters()}>
                            Filtres
                        </Button>
                    )}
                </div>
            </div>

            {(copyMapMutation.isPending || copyMapMutation.isSuccess || copyMapMutation.isError) && (
                <Alert
                    className={fr.cx("fr-mt-2v")}
                    description={t(`copy-map__${copyMapMutation.status}`)}
                    severity={copyMapMutation.status === "pending" ? "info" : copyMapMutation.status}
                    closable={!copyMapMutation.isPending}
                    small={true}
                ></Alert>
            )}

            {hasFilters && showFilters && (
                <div className={cx(classes.filterRoot, fr.cx("fr-my-6v"))}>
                    <div className={classes.filterSelect}>
                        {themes.length > 1 && (
                            <SelectNext
                                label={tCommon("filter-label")}
                                options={[
                                    { label: "Tous les thèmes", value: "" },
                                    ...themes.map((theme) => ({
                                        label: theme.name || "",
                                        value: theme.name || "",
                                    })),
                                ]}
                                nativeSelectProps={{
                                    value: routeParams.theme?.toString() ?? "",
                                    onChange: (event) => {
                                        const value = event.target.value;
                                        if (value === "") {
                                            getMapListRoute(route, {
                                                ...routeParams,
                                                theme: "",
                                                page: 1,
                                            }).push();
                                        } else {
                                            getMapListRoute(route, {
                                                ...routeParams,
                                                theme: value,
                                                page: 1,
                                            }).push();
                                        }
                                    },
                                }}
                                placeholder={tCommon("filter-placeholder")}
                                disabled={isLoading}
                            />
                        )}
                    </div>
                    <div className={classes.filterSelect}></div>
                    {/* <div className={classes.filterApplyBtn}>
                                <Button>Valider</Button>
                            </div> */}
                </div>
            )}
            {isLoading ? (
                <Skeleton count={3} rectangleHeight={200} />
            ) : (
                <>
                    {mapCount > 0 ? (
                        <>
                            <ListHeader
                                nbResults={{
                                    displayed: maps.length,
                                    total: mapCount,
                                }}
                                dataUpdatedAt={dataUpdatedAt}
                                isFetching={isFetching}
                                refetch={refetch}
                            />

                            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                                {maps.map((map) => (
                                    <div className={fr.cx("fr-col-12")} key={map.view_id}>
                                        <MapItem
                                            map={map}
                                            footer={
                                                <div className={cx(classes.footerBtnGroup)}>
                                                    {role !== UserRole.MEMBER && (
                                                        <>
                                                            <Button
                                                                title={tCommon("delete")}
                                                                iconId="fr-icon-delete-bin-line"
                                                                size="small"
                                                                priority="tertiary"
                                                                onClick={() => {
                                                                    setOpenedMap(map);
                                                                    confirmDeleteMapModal.open();
                                                                }}
                                                                // disabled={!canDelete({ organizationId: organizationId, role: role, map: map, user: user })}
                                                            />
                                                            <Button
                                                                title={tCommon("duplicate")}
                                                                iconId="ri-file-copy-line"
                                                                size="small"
                                                                priority="tertiary"
                                                                onClick={() => onCopyClick(map, copyMapMutation)}
                                                                // disabled={!canDelete({ organizationId: organizationId, role: role, map: map, user: user })}
                                                            />
                                                        </>
                                                    )}

                                                    <Button
                                                        title={tCommon("share")}
                                                        iconId="ri-share-2-line"
                                                        size="small"
                                                        priority="tertiary"
                                                        onClick={() => {
                                                            setOpenedMap(map);
                                                            shareMapModal.open();
                                                        }}
                                                    />
                                                    <Button
                                                        iconId="fr-icon-arrow-right-s-line"
                                                        size="small"
                                                        iconPosition="right"
                                                        linkProps={
                                                            // role !== UserRole.MEMBER
                                                            //     ? routes.edit_map({ mapId: map.view_id || "", organizationId: organizationId }).link
                                                            //     : routes.view_map({ map: map.view_id || "" }).link
                                                            {
                                                                href: routes.edit_map({ map: map.view_id || "" }).link.href,
                                                            }
                                                        }
                                                    >
                                                        {role !== UserRole.MEMBER ? tCommon("open") : tCommon("see")}
                                                    </Button>
                                                </div>
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 ? (
                                <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-6v")}>
                                    <Pagination
                                        count={totalPages}
                                        getPageLinkProps={(pageNumber) => ({
                                            ...getMapListRoute(route, { ...routeParams, page: pageNumber }).link,
                                        })}
                                        defaultPage={routeParams.page}
                                    />
                                </div>
                            ) : (
                                <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-6v")}></div>
                            )}
                        </>
                    ) : (
                        <NoMap />
                    )}
                </>
            )}
            {createPortal(
                <confirmDeleteMapModal.Component
                    title={t("delete-map")}
                    buttons={[
                        {
                            children: tCommon("cancel"),
                            priority: "secondary",
                        },
                        {
                            children: tCommon("delete"),
                            onClick: () => {
                                if (openedMap?.edit_id === undefined || openedMap?.edit_id === null) {
                                    return;
                                }
                                deleteMapMutation.mutate({ editId: openedMap.edit_id });
                            },
                            priority: "primary",
                            doClosesModal: true,
                        },
                    ]}
                >
                    {t("delete-map--message", { fileName: openedMap?.title })}
                </confirmDeleteMapModal.Component>,
                document.body
            )}

            {createPortal(
                <shareMapModal.Component title={t("share-map")}>
                    <TextCopyToClipboard label={tCommon("link")} hintText={t("share-map__link-hint")} text={useMapLink(openedMap)} className="fr-mb-1w" />

                    <TextCopyToClipboard
                        label={tCommon("iframe")}
                        hintText={t("share-map__iframe-hint")}
                        text={useMapIframe(openedMap)}
                        textArea
                        className="fr-mb-1w"
                    />

                    <div />
                </shareMapModal.Component>,
                document.body
            )}
        </>
    );
}

const useStyles = tss.withName({ MapList }).create({
    filterRoot: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("4v"),
        [fr.breakpoints.up("sm")]: {
            flexDirection: "row",
            alignItems: "center",
        },
    },
    filterSelect: {
        width: "100%",
        [fr.breakpoints.up("sm")]: {
            width: "auto",
            flex: 1,
        },
    },
    footerBtnGroup: {
        display: "flex",
        gap: fr.spacing("4v"),
    },
});
