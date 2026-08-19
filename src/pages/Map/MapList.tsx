import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Pagination from "@codegouvfr/react-dsfr/Pagination";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import SelectNext from "@codegouvfr/react-dsfr/SelectNext";
import { useEffect, useState } from "react";

import { useToggle } from "@mantine/hooks";
import ListMain from "@/components/Layout/ListMain";
import { useTranslation } from "@/i18n";
import { api } from "@/api";
import PageTitle from "@/components/Layout/PageTitle";
import { routes, useRoute } from "@/router/router";
import { useFakePagination } from "@/hooks/usePagination";
import { tss } from "tss-react";
import MapItem from "./MapItem";
import Skeleton from "@/components/Utils/Skeleton";
import { ListHeader } from "@/components/Layout/ListHeader";
import { usePrefetchQuery } from "@tanstack/react-query";
import RQKeys from "@/modules/maps/RQKeys";
import { type MapList as MapListType, Theme } from "@/api/model";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { createPortal } from "react-dom";
import TextCopyToClipboard from "@/components/Utils/TextCopyToClipboard";
import { useMapIframe, useMapLink } from "@/hooks/useShareMap";
import NoMap from "./NoMap";

/**
 * Élément dans l'URL de recherche
 */
type MapRouteParams = {
    page: number,
    limit: number,
    theme: string,
    query: string,
}

type MapListProps = {
    organizationId?: string,
}

const confirmDeleteMapModal = createModal({
    id: "confirm-delete-map-modal",
    isOpenedByDefault: false,
});

const shareMapModal = createModal({
    id: "share-map-modal",
    isOpenedByDefault: false,
});

const confirmCopyMapModal = createModal({
    id: "confirm-copy-map-modal",
    isOpenedByDefault: false,
});

/** 
 * Permet de récupérer les paramètres dans l'URL
 */
function useMapRouteParams(): MapRouteParams {
    // Ajouter ici les différents paramètres dans l'URL
    const route = useRoute();
    const page = route.params?.["page"] ?? 1;
    const limit = parseInt(route.params?.["limit"]) ?? 10;
    const theme = route.params?.["theme"] ?? "";
    const query = route.params?.["query"] ?? "";

    return { page, limit, theme, query };
};

export default function MapList({ organizationId }: MapListProps) {
    // Traduction
    const { t } = useTranslation("Map");
    const { t: tCommon } = useTranslation("Common");


    // React states
    const [openedMap, setOpenedMap] = useState<MapListType>();
    const [mapCount, setMapCount] = useState(0);

    // Appelé plus tard dans la modale
    const deleteMapMutation = api.map.useDeleteMapByEditId({
        mutation: {
            onSuccess: () => {
                refetch();
                confirmDeleteMapModal.close();
            },
            onError: error => {
                console.error(error);
            },
            onMutate: (args) => {
                console.log(args);
            }
        },
    });

    // const confirmCopyMutation = useMutation();
    // Param dans l'URL
    const routeParams = useMapRouteParams();
    const offset = (routeParams.page - 1) * (routeParams.limit);

    // Appel à l'API
    const { data: mapsResponse, dataUpdatedAt, isFetching, isLoading, refetch } = api.map.useGetMaps(
        { ...routeParams, offset: offset, context: "profile", organization: organizationId },
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    console.log(response)
                    if (response.status === 200 || response.status === 206) {
                        return response.data
                    }
                    else {
                        return undefined
                    }
                },
            },
        },
    );

    // Va chercher les cartes de la page d'après
    // TODO : améliorer cela car pas l'air de fonctionner
    usePrefetchQuery({
        queryKey: RQKeys.maps({ ...routeParams, offset: routeParams.page * routeParams.limit }),
        queryFn: ({ signal }) => api.map.getMaps({ ...routeParams, offset: routeParams.page * routeParams.limit }, { signal }),
    });

    // Thèmes disponible
    const { data: themesResponse } = api.theme.useGetThemes(
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200) {
                        return response.data
                    } else {
                        return undefined
                    }
                },
            },
        },
    );

    const themes = (themesResponse || []) as Theme[]

    // Cartes et nombre total de cartes
    const maps = (mapsResponse?.maps ?? []);

    useEffect(() => {
        if (mapsResponse?.count !== undefined) {
            setMapCount(mapsResponse.count);
        }
    }, [mapsResponse?.count]);

    // Permet d'activer / désactiver l'affichage des filtres
    const [showFilters, toggleShowFilters] = useToggle();

    // Filtre et tri

    // Nombre de page total
    const { totalPages } = useFakePagination(mapCount, routeParams.limit);

    // Pour classes css
    const { classes, cx } = useStyles();

    return (
        <ListMain title="Mes cartes">
            <PageTitle title={t("map-list")}>
            </PageTitle>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", "fr-mb-16v")}>
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
                    <Button
                        linkProps={
                            routes.create_map().link
                        }
                        iconId="fr-icon-add-line"
                        iconPosition="right"
                        className={fr.cx("fr-ml-auto")}
                    >
                        {t("create-map")}
                    </Button>
                </div>
            </div>

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
                                routes.map_list({ ...routeParams, query: text }).push();
                            }
                        }}
                        allowEmptySearch={true}
                        renderInput={(props) => <input {...props} disabled={isLoading} />}
                        defaultValue={routeParams.query}
                    />
                    <Button priority="secondary" iconId="fr-icon-equalizer-line" onClick={() => toggleShowFilters()}>
                        Filtres
                    </Button>
                </div>
            </div>

            {showFilters && (
                <div className={cx(classes.filterRoot, fr.cx("fr-my-6v"))}>
                    <div className={classes.filterSelect}>
                        {themes.length && <SelectNext
                            label={tCommon("filter-label")}
                            options={[
                                { label: "Tous les thèmes", value: "" },
                                ...themes.map(theme => ({
                                    label: theme.name || "",
                                    value: theme.name || "",
                                }))
                            ]}
                            nativeSelectProps={{
                                value: routeParams.theme?.toString() ?? "",
                                onChange: (event) => {
                                    const value = event.target.value;
                                    if (value === "") {
                                        routes
                                            .map_list({
                                                ...routeParams,
                                                theme: undefined,
                                                page: 1,
                                            })
                                            .push();
                                    } else {
                                        routes
                                            .map_list({
                                                ...routeParams,
                                                theme: value,
                                                page: 1,
                                            })
                                            .push();
                                    }
                                },
                            }}
                            placeholder={tCommon("filter-placeholder")}
                            disabled={isLoading}
                        />}
                    </div>
                    <div className={classes.filterSelect}>
                    </div>
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
                                        <MapItem map={map}
                                            footer={
                                                <div className={cx(classes.footerBtnGroup)}>

                                                    <Button
                                                        title={tCommon("delete")}
                                                        iconId='fr-icon-delete-bin-line'
                                                        size="small"
                                                        priority="tertiary"
                                                        onClick={() => {
                                                            setOpenedMap(map);
                                                            confirmDeleteMapModal.open()
                                                        }}
                                                    />
                                                    <Button
                                                        title={tCommon("duplicate")}
                                                        iconId='ri-file-copy-line'
                                                        size="small"
                                                        priority="tertiary"
                                                        onClick={() => {
                                                            setOpenedMap(map);
                                                            confirmCopyMapModal.open()
                                                        }}
                                                    />
                                                    <Button
                                                        title={tCommon("share")}
                                                        iconId='ri-share-2-line'
                                                        size="small"
                                                        priority="tertiary"
                                                        onClick={() => {
                                                            setOpenedMap(map);
                                                            shareMapModal.open()
                                                        }}
                                                    />
                                                    <Button
                                                        iconId="fr-icon-arrow-right-s-line"
                                                        size="small"
                                                        iconPosition="right"
                                                        linkProps={routes.view_map({ mapId: map.view_id || "", }).link}
                                                    >
                                                        {tCommon("open")}
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
                                            ...routes.map_list({ ...routeParams, page: pageNumber })
                                                .link,
                                        })}
                                        defaultPage={routeParams.page}
                                    />
                                </div>
                            ) : (
                                <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-6v")}>
                                </div>
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
                                if (openedMap?.edit_id === undefined) {
                                    return;
                                }
                                deleteMapMutation.mutate({ editId: openedMap.edit_id });
                            },
                            priority: "primary",
                            doClosesModal: true,
                        },
                    ]}
                >
                    {t('delete-map--message', { fileName: openedMap?.title })}
                </confirmDeleteMapModal.Component>,
                document.body
            )}

            {createPortal(
                <confirmCopyMapModal.Component
                    title={t("copy-map")}
                    buttons={[
                        {
                            children: tCommon("cancel"),
                            priority: "secondary",
                        },
                        {
                            children: tCommon("duplicate"),
                            priority: "primary",
                            doClosesModal: false,
                        },
                    ]}
                >
                    <div />
                </confirmCopyMapModal.Component>,
                document.body
            )}

            {createPortal(
                <shareMapModal.Component
                    title={t("share-map")}
                >

                    <TextCopyToClipboard label={tCommon("link")} hintText={t("share-map__link-hint")} text={useMapLink(openedMap)} className="fr-mb-1w" />

                    <TextCopyToClipboard label={tCommon("iframe")} hintText={t("share-map__iframe-hint")} text={useMapIframe(openedMap)} textArea className="fr-mb-1w" />

                    <div />
                </shareMapModal.Component>,
                document.body
            )}
        </ListMain>
    );
};

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

    // filterApplyBtn: {
    //     [fr.breakpoints.up("sm")]: {
    //         flex: 0,
    //         alignSelf: "flex-end",
    //     },
    // },
});

//  const useStyles = tss.withName({ MapItem }).create({
//     footerBtnGroup: {
//         display: "flex",
//         gap: fr.spacing("4v"),
//     },
// });
