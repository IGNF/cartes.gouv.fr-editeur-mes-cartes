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
import MediaItem from "./MediaItem";
import Skeleton from "@/components/Utils/Skeleton";
import { ListHeader } from "@/components/Layout/ListHeader";
import { Media, } from "@/api/model";
import NoMedia from "./NoMedia";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { createPortal } from "react-dom";

/**
 * Élément dans l'URL de recherche
 */
type MediaRouteParams = {
    page: number,
    limit: number,
    search: string,
}

const confirmDeleteMediaModal = createModal({
    id: "confirm-delete-media-modal",
    isOpenedByDefault: false,
});

const shareMediaModal = createModal({
    id: "share-media-modal",
    isOpenedByDefault: false,
});

/** 
 * Permet de récupérer les paramètres dans l'URL
 */
function useMediaRouteParams(): MediaRouteParams {
    // Ajouter ici les différents paramètres dans l'URL
    const route = useRoute();
    const page = route.params?.["page"] ?? 1;
    const limit = parseInt(route.params?.["limit"]) ?? 10;
    const search = route.params?.["search"] ?? "";

    return { page, limit, search };
};

export default function MediaList() {
    // Traduction
    const { t } = useTranslation("Media");
    const { t: tCommon } = useTranslation("Common");

    // React states
    const [openedMedia, setOpenedMedia] = useState<Media>();
    const [mediaCount, setMediaCount] = useState(0);

    // Appelé plus tard dans la modale
    const deleteMediaMutation = api.media.useDeleteMediaById({
        mutation: {
            onSuccess: () => {
                refetch();
                confirmDeleteMediaModal.close();
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
    const routeParams = useMediaRouteParams();
    const offset = (routeParams.page - 1) * (routeParams.limit);

    // Appel à l'API
    const { data: mediasResponse, dataUpdatedAt, isFetching, isLoading, refetch } = api.media.useGetUserMedias(
        { limit: routeParams.limit, name: routeParams.search, offset: offset },
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
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
    // usePrefetchQuery({
    //     queryKey: RQKeys.medias({ ...routeParams, offset: routeParams.page * routeParams.limit }),
    //     queryFn: ({ signal }) => api.media.getMedias({ ...routeParams, offset: routeParams.page * routeParams.limit }, { signal }),
    // });

    // Cartes et nombre total de cartes
    const medias = (mediasResponse?.medias ?? []);

    useEffect(() => {
        if (mediasResponse?.count !== undefined) {
            setMediaCount(mediasResponse.count);
        }
    }, [mediasResponse?.count]);

    // Permet d'activer / désactiver l'affichage des filtres
    const [showFilters, toggleShowFilters] = useToggle();

    // Filtre et tri

    // Nombre de page total
    const { totalPages } = useFakePagination(mediaCount, routeParams.limit);

    // Pour classes css
    const { classes, cx } = useStyles();

    return (
        <>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", "fr-mb-16v")}>
                <div
                    className={fr.cx("fr-col-12", "fr-py-0")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <strong className={fr.cx("fr-text--xl", "fr-m-0", "fr-mr-2v")}>{t("medias")}</strong>
                    <Badge severity="info" noIcon={true}>
                        {mediaCount}
                    </Badge>
                    <Button
                        iconId="fr-icon-add-line"
                        iconPosition="right"
                        className={fr.cx("fr-ml-auto")}
                    >
                        {t("add-media")}
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
                                routes.media_list({ ...routeParams, search: text }).push();
                            }
                        }}
                        allowEmptySearch={true}
                        renderInput={(props) => <input {...props} disabled={isLoading} />}
                        defaultValue={routeParams.search}
                    />
                    <Button priority="secondary" iconId="fr-icon-equalizer-line" onClick={() => toggleShowFilters()}>
                        Filtres
                    </Button>
                </div>
            </div>

            {showFilters && (
                <div className={cx(classes.filterRoot, fr.cx("fr-my-6v"))}>
                    <div className={classes.filterSelect}>
                        {<SelectNext
                            label={tCommon("filter-label")}
                            options={[
                                { label: "Tous les thèmes", value: "" },
                                // ...themes.map(theme => ({
                                //     label: theme.name || "",
                                //     value: theme.name || "",
                                // }))
                            ]}
                            nativeSelectProps={{
                                // value: routeParams.theme?.toString() ?? "",
                                onChange: (event) => {
                                    const value = event.target.value;
                                    if (value === "") {
                                        routes
                                            .media_list({
                                                ...routeParams,
                                                page: 1,
                                            })
                                            .push();
                                    } else {
                                        routes
                                            .media_list({
                                                ...routeParams,
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
                    {mediaCount > 0 ? (
                        <>
                            <ListHeader
                                nbResults={{
                                    displayed: medias.length,
                                    total: mediaCount,
                                }}
                                dataUpdatedAt={dataUpdatedAt}
                                isFetching={isFetching}
                                refetch={refetch}
                            />

                            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                                {medias.map((media) => (
                                    <div className={fr.cx("fr-col-12")} key={media.id} >
                                        <MediaItem media={media}
                                            footer={
                                                <div className={cx(classes.footerBtnGroup)}>

                                                    <Button
                                                        title={tCommon("delete")}
                                                        iconId='fr-icon-delete-bin-line'
                                                        size="small"
                                                        priority="tertiary"
                                                        onClick={() => {
                                                            setOpenedMedia(media);
                                                            confirmDeleteMediaModal.open()
                                                        }}
                                                    />
                                                    <Button
                                                        iconId="fr-icon-arrow-right-s-line"
                                                        size="small"
                                                        iconPosition="right"
                                                        onClick={() => {
                                                            setOpenedMedia(media);
                                                        }}
                                                    >
                                                        {tCommon("see")}
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
                                            ...routes.media_list({ ...routeParams, page: pageNumber })
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
                        <NoMedia />
                    )}
                </>
            )}
            {createPortal(
                <confirmDeleteMediaModal.Component
                    title={t("delete-media")}
                    buttons={[
                        {
                            children: tCommon("cancel"),
                            priority: "secondary",
                        },
                        {
                            children: tCommon("delete"),
                            onClick: () => {
                                if (openedMedia?.id === undefined) {
                                    return;
                                }
                                deleteMediaMutation.mutate({ id: openedMedia.id });
                            },
                            priority: "primary",
                            doClosesModal: true,
                        },
                    ]}
                >
                    {t('delete-media--message', { fileName: openedMedia?.fileName })}

                    <div />
                </confirmDeleteMediaModal.Component>,
                document.body
            )}

            {createPortal(
                <shareMediaModal.Component
                    title="titre"
                // title={t("share-media")}
                >

                    {/* <TextCopyToClipboard label={tCommon("link")} hintText={t("share-media__link-hint")} text={useMediaLink(openedMedia)} className="fr-mb-1w" />

                    <TextCopyToClipboard label={tCommon("iframe")} hintText={t("share-media__iframe-hint")} text={useMediaIframe(openedMedia)} textArea className="fr-mb-1w" /> */}

                    <div />
                </shareMediaModal.Component>,
                document.body
            )}
        </>
    );
};

const useStyles = tss.withName({ MediaList }).create({
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
