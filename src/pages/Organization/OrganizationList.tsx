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
import OrganizationItem from "./OrganizationItem";
import Skeleton from "@/components/Utils/Skeleton";
import { ListHeader } from "@/components/Layout/ListHeader";
import { Organization } from "@/api/model";
import NoOrganization from "./NoOrganization";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { createPortal } from "react-dom";

/**
 * Élément dans l'URL de recherche
 */
type OrganizationRouteParams = {
    page: number,
    limit: number,
    query: string,
}

const confirmDeleteOrganizationModal = createModal({
    id: "confirm-delete-organization-modal",
    isOpenedByDefault: false,
});

const shareOrganizationModal = createModal({
    id: "share-organization-modal",
    isOpenedByDefault: false,
});

/** 
 * Permet de récupérer les paramètres dans l'URL
 */
function useOrganizationRouteParams(): OrganizationRouteParams {
    // Ajouter ici les différents paramètres dans l'URL
    const route = useRoute();
    const page = route.params?.["page"] ?? 1;
    const limit = parseInt(route.params?.["limit"]) ?? 10;
    const query = route.params?.["query"] ?? "";

    return { page, limit, query };
};

export default function OrganizationList() {
    // Traduction
    const { t } = useTranslation("Organization");
    const { t: tCommon } = useTranslation("Common");

    // React states
    const [openedOrganization, setOpenedOrganization] = useState<Organization>();
    const [organizationCount, setOrganizationCount] = useState(0);

    // Appelé plus tard dans la modale
    const deleteOrganizationMutation = api.organization.useDeleteOrganization({
        mutation: {
            onSuccess: () => {
                refetch();
                confirmDeleteOrganizationModal.close();
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
    const routeParams = useOrganizationRouteParams();

    // Appel à l'API
    const { data: organizationsResponse, dataUpdatedAt, isFetching, isLoading, refetch } = api.organization.useGetOrganizationsMe(
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200) {
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
    //     queryKey: RQKeys.organizations({ ...routeParams, offset: routeParams.page * routeParams.limit }),
    //     queryFn: ({ signal }) => api.organization.getOrganizations({ ...routeParams, offset: routeParams.page * routeParams.limit }, { signal }),
    // });

    // Cartes et nombre total de cartes
    const organizations = (organizationsResponse ?? []);

    useEffect(() => {
        setOrganizationCount(organizations.length);
    }, [organizations.length]);

    // Permet d'activer / désactiver l'affichage des filtres
    const [showFilters, toggleShowFilters] = useToggle();

    // Filtre et tri

    // Nombre de page total
    const { totalPages } = useFakePagination(organizationCount, routeParams.limit);

    // Pour classes css
    const { classes, cx } = useStyles();

    return (
        <ListMain title={t("organization-list")}>
            <PageTitle title={t("organization-list")}>
            </PageTitle>
            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", "fr-mb-16v")}>
                <div
                    className={fr.cx("fr-col-12", "fr-py-0")}
                    style={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <strong className={fr.cx("fr-text--xl", "fr-m-0", "fr-mr-2v")}>{t("organizations")}</strong>
                    <Badge severity="info" noIcon={true}>
                        {organizationCount}
                    </Badge>
                    <Button
                        iconId="fr-icon-add-line"
                        iconPosition="right"
                        className={fr.cx("fr-ml-auto")}
                    >
                        {t("add-organization")}
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
                                routes.organization_list({ ...routeParams, query: text }).push();
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
                                            .organization_list({
                                                ...routeParams,
                                                page: 1,
                                            })
                                            .push();
                                    } else {
                                        routes
                                            .organization_list({
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
                    {organizationCount > 0 ? (
                        <>
                            <ListHeader
                                nbResults={{
                                    displayed: organizations.length,
                                    total: organizationCount,
                                }}
                                dataUpdatedAt={dataUpdatedAt}
                                isFetching={isFetching}
                                refetch={refetch}
                            />

                            <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                                {organizations.map((organization) => (
                                    <div className={fr.cx("fr-col-12")} key={organization.public_id} >
                                        <OrganizationItem organization={organization}
                                            footer={
                                                <div className={cx(classes.footerBtnGroup)}>

                                                    <Button
                                                        title={tCommon("delete")}
                                                        iconId='fr-icon-delete-bin-line'
                                                        size="small"
                                                        priority="tertiary"
                                                        onClick={() => {
                                                            setOpenedOrganization(organization);
                                                            confirmDeleteOrganizationModal.open()
                                                        }}
                                                    />
                                                    <Button
                                                        iconId="fr-icon-arrow-right-s-line"
                                                        size="small"
                                                        iconPosition="right"
                                                        linkProps={routes.organization_maps({ organizationId: organization.public_id || "", }).link}
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
                                            ...routes.organization_list({ ...routeParams, page: pageNumber })
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
                        <NoOrganization />
                    )}
                </>
            )}
            {createPortal(
                <confirmDeleteOrganizationModal.Component
                    title={t("delete-organization")}
                    buttons={[
                        {
                            children: tCommon("cancel"),
                            priority: "secondary",
                        },
                        {
                            children: tCommon("delete"),
                            onClick: () => {
                                if (openedOrganization?.public_id === undefined) {
                                    return;
                                }
                                deleteOrganizationMutation.mutate({ id: openedOrganization.public_id });
                            },
                            priority: "primary",
                            doClosesModal: true,
                        },
                    ]}
                >
                    {t('delete-organization--message', { name: openedOrganization?.name })}

                    <div />
                </confirmDeleteOrganizationModal.Component>,
                document.body
            )}

            {createPortal(
                <shareOrganizationModal.Component
                    title="titre"
                // title={t("share-organization")}
                >

                    {/* <TextCopyToClipboard label={tCommon("link")} hintText={t("share-organization__link-hint")} text={useOrganizationLink(openedOrganization)} className="fr-mb-1w" />

                    <TextCopyToClipboard label={tCommon("iframe")} hintText={t("share-organization__iframe-hint")} text={useOrganizationIframe(openedOrganization)} textArea className="fr-mb-1w" /> */}

                    <div />
                </shareOrganizationModal.Component>,
                document.body
            )}
        </ListMain>
    );
};

const useStyles = tss.withName({ OrganizationList }).create({
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
