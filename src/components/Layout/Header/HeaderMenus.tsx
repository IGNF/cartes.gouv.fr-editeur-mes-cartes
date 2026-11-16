import { fr } from "@codegouvfr/react-dsfr";
import { externalLink, externalUrls } from "@/router/externalUrls";
import HeaderMenu from "./HeaderMenu";
import "../../../sass/components/buttons.scss";
import { useOidc } from "@/oidc";
import { useTranslation } from "@/i18n";
import Badge from "@codegouvfr/react-dsfr/Badge";

export function HeaderMenuHelp() {
    const { t } = useTranslation("Layout");

    return (
        <HeaderMenu
            openButtonProps={{
                children: t("help"),
                iconId: "fr-icon-question-fill",
            }}
            items={[
                {
                    iconId: "fr-icon-question-mark",
                    children: t("faq"),
                    linkProps: externalLink("help", t("faq")),
                },
                {
                    iconId: "fr-icon-book-2-line",
                    children: t("user-guide"),
                    linkProps: externalLink("helpProducerGuide", t("user-guide")),
                },
                {
                    iconId: "fr-icon-rfid-line",
                    children: t("service-status"),
                    linkProps: externalLink("service_status", t("service-status")),
                },
                {
                    iconId: "fr-icon-mail-line",
                    children: t("contact-us"),
                    linkProps: externalLink("contact_us", t("contact-us")),
                },
            ]}
        />
    );
}

export function HeaderMenuServices() {
    const { t } = useTranslation("Layout");

    return (
        <HeaderMenu
            openButtonProps={{
                children: t("services"),
                iconId: "fr-icon-grid-fill",
            }}
            items={[
                {
                    iconId: "fr-icon-road-map-line",
                    children: t("explore-maps"),
                    linkProps: { href: externalUrls.maps },
                },
                {
                    iconId: "fr-icon-search-line",
                    children: t("search-data"),
                    linkProps: { href: externalUrls.catalogue },
                },
                {
                    iconId: "fr-icon-database-line",
                    children: t("publish-data"),
                    linkProps: { href: externalUrls.discover_publish },
                },
                {
                    iconId: "fr-icon-brush-line",
                    children: (
                        <>
                            {t("create-map")}{" "}
                            <Badge severity="success" className={"fr-ml-auto"} noIcon={true} small={true}>
                                {t("beta")}
                            </Badge>
                        </>
                    ),
                    linkProps: { href: externalUrls.create_map },
                },
                {
                    // @ts-expect-error Icône personnalisé non prise en compte dans React-dsfr
                    iconId: "fr-icon-extract",
                    children: (
                        <>
                            {t("extract-data")}{" "}
                            <Badge severity="success" className={"fr-ml-auto"} noIcon={true} small={true}>
                                {t("beta")}
                            </Badge>
                        </>
                    ),
                    linkProps: { href: externalUrls.extract_data },
                },
                {
                    iconId: "fr-icon-message-2-line",
                    children: (
                        <>
                            {t("contribute-data")}{" "}
                            <Badge severity="success" className={"fr-ml-auto"} noIcon={true} small={true}>
                                {t("beta")}
                            </Badge>
                        </>
                    ),
                    linkProps: { href: externalUrls.collaborate },
                },
            ]}
            actionButtonProps={{
                children: t("discover-cartesgouvfr"),
                className: "frx-btn-discover",
                linkProps: {
                    href: externalUrls.discover_cartesgouvfr,
                    title: t("discover-cartesgouvfr-title"),
                },
            }}
        />
    );
}

export function HeaderMenuUser() {
    // const { t } = useTranslation({ HeaderMenus: HeaderMenuConnexion });
    const { t } = useTranslation("Layout");
    const { logout, isUserLoggedIn, decodedIdToken } = useOidc();

    return (
        <>
            {isUserLoggedIn ? (
                <HeaderMenu
                    openButtonProps={{
                        children: t("account"),
                        iconId: "fr-icon-account-circle-fill",
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
                        { iconId: "fr-icon-dashboard-3-line", children: t("board"), linkProps: { href: externalUrls.dashboard } },
                        { iconId: "fr-icon-user-line", children: t("account"), linkProps: { href: externalUrls.my_account } },
                    ]}
                    actionButtonProps={{
                        children: t("disconnect-me"),
                        iconId: "fr-icon-logout-box-r-line",
                        onClick: () => logout({ redirectTo: "home" }),
                    }}
                />
            ) : (
                <></>
            )}
        </>
    );
}
