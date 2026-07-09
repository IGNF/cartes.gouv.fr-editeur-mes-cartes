import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import Pagination from "@codegouvfr/react-dsfr/Pagination";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import SelectNext from "@codegouvfr/react-dsfr/SelectNext";
import { FC } from "react";

import { useToggle } from "@mantine/hooks";
import MapMain from "@/components/Layout/MapMain";
import { useTranslation } from "@/i18n";
import api from "@/api";
import PageTitle from "@/components/Layout/PageTitle";
import { routes, useRoute } from "@/router/router";
import { useSearch } from "@/hooks/useSearch";
import { useFilters } from "@/hooks/useFilters";
import { useSort } from "@/hooks/useSort";
import { useFakePagination } from "@/hooks/usePagination";
import { tss } from "tss-react";
import MapListItem from "./MapListItem";
import Skeleton from "@/components/Utils/Skeleton";
import { ListHeader } from "@/components/Layout/ListHeader";
import NoData from "./NoData";
import { usePrefetchQuery } from "@tanstack/react-query";
import RQKeys from "@/modules/maps/RQKeys";
import { ApiMapsParams, type MapList, MapResearch, Theme } from "@/api/model";
import NoCorrespondingData from "./NoCorrespondingData";


/**
 * Élément dans l'URL de recherche
 */
type MapRouteParams = {
    page: number,
    limit: number,
    offset: number,
    theme: string,
    query: string,
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
    const query = route.params?.["query"] ?? "";
    const offset = (page - 1) * (limit);

    return { page, limit, offset, theme, query };
};

const MapList: FC = () => {
    // Traduction
    const { t } = useTranslation("MapList");
    const { t: tCommon } = useTranslation("Common");

    // Param dans l'URL
    const routeParams = useMapRouteParams();


    // Appel à l'API
    const { data: mapsResponse, dataUpdatedAt, isFetching, isLoading, refetch } = api.map.useApiMaps(
        { ...routeParams },
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200) {
                        return response.data
                    } else if (response.status === 206) {
                        return response.data as unknown as { maps?: MapResearch; count?: number }
                    } else {
                        return undefined
                    }
                },
            },
        },
    );

    // Va chercher les cartes de la page d'après
    usePrefetchQuery({
        queryKey: RQKeys.maps({ ...routeParams, offset: routeParams.page * routeParams.limit }),
        queryFn: ({ signal }) => api.map.apiMaps({ ...routeParams, offset: routeParams.page * routeParams.limit }, { signal }),
    });

    // Thèmes disponible
    const { data: themesResponse } = api.theme.useApiThemes(
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
    const maps = (mapsResponse?.maps ?? []) as MapList[];
    const mapCount = mapsResponse?.count ?? 0;

    // Permet d'activer / désactiver l'affichage des filtres
    const [showFilters, toggleShowFilters] = useToggle();

    // Filtre et tri

    // Nombre de page total
    const { totalPages } = useFakePagination(mapCount, routeParams.limit);

    // Pour classes css
    const { classes, cx } = useStyles();

    return (
        <MapMain title="Mes cartes">
            <PageTitle title={t("map_list")}>
            </PageTitle>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", "fr-mb-16v")}>
                <div
                    className={fr.cx("fr-col-12", "fr-py-0")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <strong className={fr.cx("fr-text--xl", "fr-m-0", "fr-mr-2v")}>Cartes</strong>
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
                        {t("create_map")}
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
                            label={t("filter_label")}
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
                                    console.log(value)
                                    if (value === "") {
                                        routes
                                            .map_list({
                                                ...routeParams,
                                            })
                                            .push();
                                    } else {
                                        routes
                                            .map_list({
                                                ...routeParams,
                                                theme: value,
                                            })
                                            .push();
                                    }
                                },
                            }}
                            placeholder={t("filter_placeholder")}
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
                                        <MapListItem map={map} />
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
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
                            )}
                        </>
                    ) : (
                        <NoCorrespondingData />
                    )}
                </>
            )}
        </MapMain>
    );
};

export default MapList;

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
    // filterApplyBtn: {
    //     [fr.breakpoints.up("sm")]: {
    //         flex: 0,
    //         alignSelf: "flex-end",
    //     },
    // },
});
