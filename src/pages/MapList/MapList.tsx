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
import { useQuery } from "@tanstack/react-query";
import RQKeys from "@/modules/maps/RQKeys";
import PageTitle from "@/components/Layout/PageTitle";
import { routes, useRoute } from "@/router/router";
import { useSearch } from "@/hooks/useSearch";
import { useFilters } from "@/hooks/useFilters";
import { useSort } from "@/hooks/useSort";
import { usePagination } from "@/hooks/usePagination";
import { tss } from "tss-react";
import MapListItem from "./MapListItem";
import { MapItem } from "@/@types/app";
import Skeleton from "@/components/Utils/Skeleton";
import { ListHeader } from "@/components/Layout/ListHeader";
import NoData from "./NoData";
import { useTheme } from "@/hooks/useTheme";


const MapList: FC = () => {
    const { t } = useTranslation("MapList");
    const { t: tCommon } = useTranslation("Common");
    const mapListQuery = useQuery({
        queryKey: RQKeys.maps(),
        queryFn: ({ signal }) => api.maps.getMaps({ limit: "all" }, signal),
        staleTime: 60000,
    });
    const { data: mapList, dataUpdatedAt, isFetching, isLoading, refetch } = mapListQuery;

    const { params } = useRoute();
    const page = params["page"] ? parseInt(params["page"]) : 1;
    const limit = params["limit"] ? parseInt(params["limit"]) : 10;

    const [showFilters, toggleShowFilters] = useToggle();
    // filtre et tri
    const { search, searchedItems } = useSearch(mapList?.maps ?? []);
    const { filteredItems, filters } = useFilters(searchedItems, ["published"]);
    const { sortBy, sortOrder, sortedItems } = useSort(filteredItems, ["name", "nb_publications"]);
    const { paginatedItems, totalPages } = usePagination(sortedItems, page, limit);

    const themesInMap = useTheme(mapList?.maps ?? []);

    const { classes, cx } = useStyles();
    console.log(mapList)

    return (
        <MapMain title="Mes cartes">
            <PageTitle title={t("map_list")}>
            </PageTitle>
            {mapList && mapList.count > 0 && (
                <>
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
                                {filteredItems.length ?? 0}
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
                                        routes.map_list({ ...filters, search: text, sortBy, sortOrder }).replace();
                                    }
                                }}
                                allowEmptySearch={true}
                                renderInput={(props) => <input {...props} disabled={isLoading} />}
                                defaultValue={search}
                            />
                            <Button priority="secondary" iconId="fr-icon-equalizer-line" onClick={() => toggleShowFilters()}>
                                Filtres
                            </Button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className={cx(classes.filterRoot, fr.cx("fr-my-6v"))}>
                            <div className={classes.filterSelect}>
                                <SelectNext
                                    label={t("filter_label")}
                                    options={[
                                        { label: "Tous les thèmes", value: "" },
                                        ...themesInMap.map(theme => ({
                                            label: theme.name,
                                            value: theme.id.toString(),
                                        }))
                                    ]}
                                    nativeSelectProps={{
                                        value: filters.published?.toString() ?? "",
                                        onChange: (event) => {
                                            const value = event.target.value;
                                            if (value === "") {
                                                return
                                            } else {
                                                routes
                                                    .map_list({
                                                        ...filters,
                                                        search,
                                                        sortBy,
                                                        sortOrder,
                                                        themeId: value,
                                                    })
                                                    .replace();
                                            }
                                        },
                                    }}
                                    placeholder={t("filter_placeholder")}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className={classes.filterSelect}>
                            </div>
                            {/* <div className={classes.filterApplyBtn}>
                                <Button>Valider</Button>
                            </div> */}
                        </div>
                    )}
                </>
            )}
            {isLoading ? (
                <Skeleton count={6} rectangleHeight={200} />
            ) : (
                <>
                    {mapList && mapList.count > 0 ? (
                        <>
                            <ListHeader
                                nbResults={{
                                    displayed: paginatedItems.length,
                                    total: mapList.count,
                                }}
                                dataUpdatedAt={dataUpdatedAt}
                                isFetching={isFetching}
                                refetch={refetch}
                            />

                            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                                {paginatedItems.map((map: MapItem) => (
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
                                            ...routes.map_list({ ...filters, page: pageNumber, limit: limit, search, sortBy, sortOrder })
                                                .link,
                                        })}
                                        defaultPage={page}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <NoData />
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
