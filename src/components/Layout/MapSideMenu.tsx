import { fr } from "@codegouvfr/react-dsfr";
import SideMenu from "@codegouvfr/react-dsfr/SideMenu";
import { Highlight, type HighlightProps } from "@codegouvfr/react-dsfr/Highlight";
import { tss } from "tss-react";

import { useTranslation } from "@/i18n";
import { routes, useRoute } from "@/router/router";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { externalLink } from "@/router/externalUrls";

export default function MapSideMenu() {
    const { t: tCommon } = useTranslation("Common");
    const route = useRoute();
    const { classes, css, cx } = useStyles();

    const highlightOptions: Partial<HighlightProps> =
    {
        className: css({
            marginLeft: 0,
            fontWeight: "normal"
        }),
        size: "lg",
    };

    return (
        <SideMenu
            title={
                <div
                    className={css({
                        margin: `${fr.spacing("6v")} ${fr.spacing("8v")} ${fr.spacing("4v")} 0`,
                        borderBottom: `1px solid ${fr.colors.decisions.border.default.grey.default}`,
                        paddingBottom: fr.spacing("4v")
                    })}
                >
                    <div
                        className={css({
                            display: "flex",
                            gap: fr.spacing("2v"),
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "stretch",
                        })}
                    >
                        <span className={fr.cx("fr-icon-database-line", "fr-icon--md")} />
                        <h1 className={fr.cx("fr-text--xl", "fr-m-0")}>Mes cartes</h1>
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
                        Gérer mes cartes
                    </p>
                    <p
                        className={cx(
                            fr.cx("fr-mb-4v"),
                            css({
                                marginTop: "",
                                borderTop: "1px solid var(--border-default-grey)"
                            })
                        )}
                    >
                    </p>
                    <Badge
                        as="span"
                        noIcon
                        severity="success"
                        className={cx(
                            fr.cx("fr-mb-4v"),
                        )}
                    >
                        SERVICE BETA
                    </Badge>
                    <Highlight
                        {...highlightOptions}
                    >
                        La création de cartes interactives est un service gratuit et libre dans lequel vous pouvez créer et partagez facilement votre carte.
                    </Highlight>
                    <Highlight
                        {...highlightOptions}
                        className={cx(highlightOptions.className,
                            css({ paddingTop: fr.spacing("8v") }))
                        }
                    >
                        1. Utilisez les données de cartes.gouv.fr, ou importez vos propres données.
                    </Highlight>
                    <Highlight
                        {...highlightOptions}
                        className={cx(highlightOptions.className,
                            css({ paddingTop: fr.spacing("4v") }))
                        }
                    >
                        2. Personnalisez le style et la mise en page de vos données.

                    </Highlight>
                    <Highlight
                        {...highlightOptions}
                        className={cx(highlightOptions.className,
                            css({ paddingTop: fr.spacing("4v") }))
                        }
                    >
                        3. Partagez-là autour de vous.
                    </Highlight>
                    <Highlight
                        {...highlightOptions}
                        className={cx(highlightOptions.className,
                            css({ paddingTop: fr.spacing("4v"), marginBottom: fr.spacing("4v") }))
                        }
                    >
                        4. Retrouvez vos cartes depuis votre tableau de bord.
                    </Highlight>
                    <a {...externalLink("helpUserGuideCreateMap", "En savoir plus")}
                        className={cx(
                            fr.cx("fr-link"), fr.cx("fr-mb-4v"),
                            css({
                                "--underline-img": "linear-gradient(0deg,currentColor,currentColor)",
                                fontWeight: "initial",
                            })
                        )} >
                        En savoir plus
                    </a>
                </div>
            }
            burgerMenuButtonText="Entrepôts"
            items={[
                {
                    text: tCommon("maps_sidemenu"),
                    linkProps: routes.map_list().link,
                    expandedByDefault: true,
                    isActive: route.name === routes.map_list().name || route.name === routes.home().name,
                },
            ]}
            classes={{
                root: classes.root,
                inner: classes.inner,
            }}
        />
    );
}

const useStyles = tss.withName({ MapSideMenu }).create({
    root: {
        padding: 0,
    },
    inner: {
        padding: 0,
        boxShadow: "none",
    },
});
