import { fr } from "@codegouvfr/react-dsfr";
import SideMenu from "@codegouvfr/react-dsfr/SideMenu";
import { tss } from "tss-react";
import { externalLink, externalUrls } from "@/router/externalUrls";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { useTranslation } from "@/i18n";

// import { Highlight, type HighlightProps } from "@codegouvfr/react-dsfr/Highlight";
// import { useTranslation } from "@/i18n";
// import { routes, useRoute } from "@/router/router";
// import { api } from "@/api";

// type AppSideMenuProps = {
//     organizationId?: string;
// };

export default function AppSideMenu(
    // { organizationId }: AppSideMenuProps
) {
    // const { t: tMap } = useTranslation("Map");
    // const { t: tMedia } = useTranslation("Media");
    // const { t: tOrganization } = useTranslation("Organization");
    // const route = useRoute();
    const { classes, css, cx } = useStyles();

    const { t } = useTranslation("Layout");

    // const highlightOptions: Partial<HighlightProps> = {
    //     className: css({
    //         marginLeft: 0,
    //         fontWeight: "normal",
    //     }),
    //     size: "lg",
    // };

    // // Appel à l'API
    // const { data: organizationsResponse } = api.organization.useGetOrganizationsMe({
    //     query: {
    //         // Évite les erreurs typescript en vérifiant le bon retour
    //         select: (response) => {
    //             if (response.status === 200) {
    //                 return response.data;
    //             } else {
    //                 return undefined;
    //             }
    //         },
    //     },
    // });

    // const organizations = organizationsResponse ?? [];
    // // Tri par nom
    // organizations.sort((orgA, orgB) => {
    //     if (orgA.name && orgB.name) {
    //         return orgA.name.toUpperCase().localeCompare(orgB.name.toUpperCase(), "fr", { ignorePunctuation: true });
    //     }
    //     // Sinon retourne 0 (pas de changement)
    //     return 0;
    // });

    return (
        <SideMenu
            title={
                <div className={cx(classes.info)}>
                    <div
                        className={css({
                            display: "flex",
                            gap: fr.spacing("2v"),
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "stretch",
                        })}
                    >
                        <span className={fr.cx("fr-icon-brush-line", "fr-icon--md")} />
                        <h1 className={fr.cx("fr-text--xl", "fr-m-0")}>{t("my-maps")}</h1>
                    </div>
                    <p
                        className={cx(
                            fr.cx("fr-text--xs", "fr-mb-4v"),
                            css({
                                color: fr.colors.decisions.text.mention.grey.default,
                                fontWeight: "normal",
                            })
                        )}
                    >
                        {t("manage-my-maps")}
                    </p>
                    <p
                        className={cx(
                            fr.cx("fr-mb-4v"),
                            css({
                                marginTop: "",
                                borderTop: "1px solid var(--border-default-grey)",
                            })
                        )}
                    ></p>
                    <Badge as="span" noIcon severity="success" className={cx(fr.cx("fr-mb-4v"))}>
                        {t("beta-service")}
                    </Badge>
                    <p className={cx(classes.text)}>{t("maps-description")}</p>
                    <p className={cx(classes.text, css({ paddingTop: fr.spacing("4v") }))}>{t("maps-step-1")}</p>
                    <p className={cx(classes.text, css({ paddingTop: fr.spacing("4v") }))}>{t("maps-step-2")}</p>
                    <p className={cx(classes.text, css({ paddingTop: fr.spacing("4v") }))}>{t("maps-step-3")}</p>
                    <p className={cx(classes.text, css({ paddingTop: fr.spacing("4v"), marginBottom: fr.spacing("4v") }))}>{t("maps-step-4")}</p>
                    <a
                        {...externalLink("helpUserGuideCreateMap", t("learn-more"))}
                        className={cx(
                            fr.cx("fr-link"),
                            fr.cx("fr-mb-4v"),
                            css({
                                "--underline-img": "linear-gradient(0deg,currentColor,currentColor)",
                                fontWeight: "initial",
                            })
                        )}
                    >
                        {t("learn-more")}
                    </a>

                    {externalUrls.feedback && (
                        <div className={fr.cx("fr-my-4v")}>
                            <a
                                {...externalLink("feedback", t("give-feedback"))}
                                className={cx(
                                    fr.cx("fr-link"),
                                    css({
                                        "--underline-img": "linear-gradient(0deg,currentColor,currentColor)",
                                        fontWeight: "initial",
                                    })
                                )}
                            >
                                {t("give-feedback")}
                            </a>
                        </div>
                    )}
                </div>
            }
            burgerMenuButtonText={t("my-maps")}
            items={[]}

            // items={[
            //     {
            //         text: tMap("map-list"),
            //         linkProps: routes.map_list().link,
            //         expandedByDefault: true,
            //         isActive: route.name === routes.map_list().name,
            //     },
            //     {
            //         text: tMedia("media-list"),
            //         linkProps: routes.media_list().link,
            //         expandedByDefault: true,
            //         isActive: route.name === routes.media_list().name,
            //     },
            //     {
            //         text: tOrganization("organization-list"),
            //         linkProps: routes.organization_list().link,
            //         expandedByDefault: true,
            //         isActive: route.name === routes.organization_list().name,
            //     },
            //     ...organizations.map((organization) => ({
            //         text: organization.name,
            //         linkProps: routes.organization_maps({ organizationId: organization.public_id || "" }).link,
            //         isActive: organizationId === organization.public_id,
            //     })),
            // ]}
            classes={{
                root: classes.root,
                inner: classes.inner,
            }}
        />
    );
}

const useStyles = tss.withName({ AppSideMenu }).create({
    root: {
        padding: 0,
    },
    inner: {
        padding: 0,
        [fr.breakpoints.up("md")]: {
            boxShadow: "none",
        },
    },
    info: {
        [fr.breakpoints.up("md")]: {
            margin: `${fr.spacing("6v")} ${fr.spacing("8v")} ${fr.spacing("4v")} 0`,
            paddingBottom: fr.spacing("4v"),
            // borderBottom: `1px solid ${fr.colors.decisions.border.default.grey.default}`,
        },
    },
    text: {
        fontWeight: 400,
    },
});
