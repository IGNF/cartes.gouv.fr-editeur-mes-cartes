import { FC } from "react";
import { api } from "@/api";
import { OrganizationLayoutChildrenProps } from "./OrganizationLayout";
import { useTranslation } from "@/i18n";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
import LoadingText from "@/components/Utils/LoadingText";
import { UserRole } from "@/types/UserRole";
import Button from "@codegouvfr/react-dsfr/Button";
import { useImage } from "@/hooks/useImage";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { createPortal } from "react-dom";
import { useEditorUser } from "@/hooks/useEditorUser";
import { routes } from "@/router/router";

const confirmDeleteOrg = createModal({
    id: "confirm-delete-organization-modal",
    isOpenedByDefault: false,
});

const confirmLeaveOrg = createModal({
    id: "confirm-leave-organization-modal",
    isOpenedByDefault: false,
});

const OrganizationInfo: FC<OrganizationLayoutChildrenProps> = ({ organizationId, role }) => {
    const { t } = useTranslation("Organization");
    const { t: tCommon } = useTranslation("Common");

    const organizationQuery = api.organization.useGetOrganizationsById(organizationId, {
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

    // Pour le pattern
    const orgInfoQuery = api.organization.useGetOrganizationLinksById(organizationId, {
        query: {
            enabled: role === UserRole.OWNER,
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

    const user = useEditorUser();

    // Pour quitter l'espace de travail
    const deleteOrgMemberMutation = api.organization.useDeleteOrganizationMember({
        mutation: {
            onSuccess: (response, variables, context) => {
                // TODO : AFFICHER MESSAGE VALIDATION ?
                console.log("success");
                console.log(response, variables, context);

                // L'utilisateur a été enlevé
                if (response.status === 204) {
                    routes.organization_list().push();
                }
                // Erreur : on ne change pas la définition
                else {
                    console.error("error");
                }
            },
            onError: (error) => {
                // TODO : AFFICHER MESSAGE ERREUR ?
                console.log("erreur");
                console.error(error);
            },
            onMutate: (...args) => {
                // TODO : FERMER LA MODALE ET AFFICHER MESSAGE IN PROGRESS ?
                console.log("on mutate");
                console.log(...args);
            },
        },
    });

    // Pour supprimer l'espace de travail
    // const deleteOrgMutation = api.organization.useDeleteOrganization({
    //     mutation: {
    //         onSuccess: () => {
    //             // TODO : AFFICHER MESSAGE VALIDATION ?
    //             console.log("success");
    //             routes.organization_list().push();
    //         },
    //         onError: (error) => {
    //             // TODO : AFFICHER MESSAGE ERREUR ?
    //             console.log("erreur");
    //             console.error(error);
    //         },
    //         onMutate: (args) => {
    //             // TODO : FERMER LA MODALE ET AFFICHER MESSAGE IN PROGRESS ?
    //             console.log("on mutate");
    //             console.log(args);
    //         },
    //     },
    // });

    const organization = organizationQuery.data;
    const infos = orgInfoQuery.data;

    const image = useImage(organization?.cover_picture);

    const isLoading = organizationQuery.isLoading && orgInfoQuery.isLoading;
    const { classes, cx } = useStyles();

    return (
        <>
            {isLoading && <LoadingText />}
            {!isLoading && (
                <>
                    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", "fr-mb-2v")}>
                        <div
                            className={fr.cx("fr-col-12", "fr-py-0")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <strong className={fr.cx("fr-text--xl", "fr-m-0", "fr-mr-2v")}>{t("info")}</strong>

                            <div>
                                {role === UserRole.OWNER && (
                                    <>
                                        <Button className={fr.cx("fr-mr-4v")} priority="secondary">
                                            {tCommon("modify")}
                                        </Button>
                                        <Button className={fr.cx("fr-mr-4v")} priority="secondary">
                                            {tCommon("delete")}
                                        </Button>
                                    </>
                                )}
                                <Button
                                    priority="tertiary"
                                    onClick={() => {
                                        confirmLeaveOrg.open();
                                    }}
                                >
                                    {t("leave-organization")}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
                        <div className={cx(classes.infos, fr.cx("fr-col-12", "fr-mt-12v"))}>
                            <div>
                                <p className={fr.cx("fr-text--bold", "fr-m-0")}>{t("organization-name")}</p>
                                <p className={fr.cx("fr-my-2v")}>{organization?.name}</p>
                            </div>

                            <div>
                                <p className={fr.cx("fr-text--bold", "fr-m-0")}>{t("organization-description")}</p>
                                <p className={fr.cx("fr-hint-text", "fr-my-2v")}>{t("organization-description__hint")}</p>
                                {organization?.presentation && <p>{organization.presentation}</p>}
                            </div>

                            <div>
                                <p className={fr.cx("fr-text--bold", "fr-m-0")}>{t("organization-image")}</p>
                                <p className={fr.cx("fr-hint-text", "fr-my-2v")}>{t("organization-image__hint")}</p>
                                <figure className={fr.cx("fr-content-media", "fr-content-media--sm")}>
                                    <div className={fr.cx("fr-content-media__img")}>
                                        <img className={fr.cx("fr-ratio-16x9", "fr-responsive-img")} src={image} alt={t("organization-image__alt")} />
                                    </div>
                                </figure>
                            </div>

                            {role === UserRole.OWNER && (
                                <div>
                                    <p className={fr.cx("fr-text--bold", "fr-m-0")}>{t("organization-limit-access")}</p>
                                    <p className={fr.cx("fr-hint-text", "fr-my-2v")}>{t("organization-limit-access__hint")}</p>
                                    <p>{infos?.mail_pattern ? t("organization-limit-access__value", infos.mail_pattern) : t("no-registered-domain")}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {createPortal(
                <confirmLeaveOrg.Component
                    title={t("leave-organization")}
                    buttons={[
                        {
                            children: tCommon("cancel"),
                            priority: "secondary",
                        },
                        {
                            children: t("leave-organization"),
                            onClick: () => {
                                if (user?.public_id === undefined) {
                                    return;
                                }
                                deleteOrgMemberMutation.mutate({ id: organizationId, userId: user?.public_id });
                            },
                            priority: "primary",
                            doClosesModal: true,
                        },
                    ]}
                >
                    {t("leave-organization__message", { organizationName: organization?.name })}
                </confirmLeaveOrg.Component>,
                document.body
            )}

            {role === UserRole.OWNER &&
                createPortal(
                    <confirmDeleteOrg.Component
                        title={t("remove-member")}
                        buttons={[
                            {
                                children: tCommon("cancel"),
                                priority: "secondary",
                            },
                            {
                                children: t("leave-organization"),
                                onClick: () => {
                                    if (user?.public_id === undefined) {
                                        return;
                                    }
                                    deleteOrgMemberMutation.mutate({ id: organizationId, userId: user?.public_id });
                                },
                                priority: "primary",
                                doClosesModal: true,
                            },
                        ]}
                    >
                        {t("leave-organization__message", { organizationName: organization?.name })}
                    </confirmDeleteOrg.Component>,
                    document.body
                )}
        </>
    );
};

export default OrganizationInfo;

const useStyles = tss.withName({ OrganizationInfo }).create({
    infos: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        "& > div": {},
    },
});
