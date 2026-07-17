
import { fr } from "@codegouvfr/react-dsfr";
import { externalLink, externalUrls } from "@/router/externalUrls";
import { routes } from "@/router/router";
import HeaderMenu from "./HeaderMenu";
import "../../../sass/components/buttons.scss";
import { useOidc } from "@/oidc";
import { useTranslation } from "@/i18n";

export function HeaderMenuHelp() {
    return (
        <HeaderMenu
            openButtonProps={{
                children: "Aide",
                iconId: "fr-icon-question-fill",
            }}
            items={[
                {
                    iconId: "fr-icon-question-mark",
                    children: "Questions fréquentes",
                    linkProps: externalLink("help", "Questions fréquentes"),
                },
                {
                    iconId: "fr-icon-book-2-line",
                    children: "Guide d’utilisation",
                    linkProps: externalLink("helpProducerGuide", "Guide d’utilisation"),
                },
                {
                    iconId: "fr-icon-rfid-line",
                    children: "Niveau de service",
                    linkProps: externalLink("service_status", "Niveau de service"),
                },
                {
                    iconId: "fr-icon-mail-line",
                    children: "Nous contacter",
                    linkProps: externalLink("contact_us", "Nous contacter"),
                },
            ]}
        />
    );
}

export function HeaderMenuServices() {
    return (
        <HeaderMenu
            openButtonProps={{
                children: "Services",
                iconId: "fr-icon-grid-fill",
            }}
            items={[
                {
                    iconId: "fr-icon-road-map-line",
                    children: "Explorer les cartes",
                    linkProps: { href: externalUrls.maps },
                },
                {
                    iconId: "fr-icon-search-line",
                    children: "Rechercher une donnée",
                    linkProps: { href: externalUrls.catalogue },
                },
                {
                    iconId: "fr-icon-database-line",
                    children: "Publier une donnée",
                    linkProps: routes.discover_publish().link,
                },
                // {
                //     iconId: "fr-icon-brush-line",
                //     children: (
                //         <>
                //             Créer une carte{" "}
                //             <Badge severity="success" className={"fr-ml-auto"}>
                //                 Bêta
                //             </Badge>
                //         </>
                //     ),
                //     linkProps: { href: externalUrls.create_map },
                // },
            ]}
            actionButtonProps={{
                children: "Découvrir cartes.gouv.fr",
                className: "frx-btn-discover",
                linkProps: {
                    href: externalUrls.discover_cartesgouvfr,
                    title: "Découvrir cartes.gouv",
                },
            }}
        />
    );
}

export function HeaderMenuUser() {
    // const { t } = useTranslation({ HeaderMenus: HeaderMenuConnexion });
    const { t } = useTranslation("Layout");
    const { logout, isUserLoggedIn, decodedIdToken, goToAuthServer } = useOidc();

    console.log(decodedIdToken)

    return (
        <>
            {isUserLoggedIn ? (
                <HeaderMenu
                    openButtonProps={{
                        children: "Mon compte",
                        iconId: "fr-icon-account-circle-fill"
                    }}
                    items={[
                        {
                            children: (
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span className={fr.cx("fr-text--bold")}>{decodedIdToken.preferred_username}</span>
                                    <span
                                        className={fr.cx("fr-text--xs", "fr-m-0")}
                                        style={{
                                            color: fr.colors.decisions.text.mention.grey.default,
                                        }}
                                    >
                                        {decodedIdToken.email}
                                    </span>
                                </div>
                            ),
                        },
                        { iconId: "fr-icon-dashboard-3-line", children: t("board"), linkProps: { href: externalUrls.contact_us } },
                        { iconId: "fr-icon-user-line", children: t("account"), linkProps: { href: externalUrls.contact_us } },
                    ]}
                    actionButtonProps={{
                        children: "Me déconnecter",
                        iconId: "fr-icon-logout-box-r-line",
                        onClick: () => logout({ redirectTo: "home" }),
                    }}
                />
            ) : (
                <>

                </>
            )}
        </>
    );
}
