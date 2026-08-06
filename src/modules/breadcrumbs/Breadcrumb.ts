import { BreadcrumbProps, addBreadcrumbTranslations } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Route } from "type-route";

import { getTranslation } from "../../i18n/i18n";
import { routes } from "../../router/router";

const { t } = getTranslation("Breadcrumb");

const getBreadcrumb = (route: Route<typeof routes>): BreadcrumbProps | undefined => {
    addBreadcrumbTranslations({
        lang: "fr",
        messages: { home: t("dashboard") },
    });

    const mapProps: BreadcrumbProps = {
        homeLinkProps: routes.home().link,
        // segments: [{ label: t("dashboard"), linkProps: routes.dashboard().link }],
        segments: [],
        currentPageLabel: t("map_list"),
    };

    const mediaProp: BreadcrumbProps = {
        homeLinkProps: routes.home().link,
        // segments: [{ label: t("dashboard"), linkProps: routes.dashboard().link }],
        segments: [],
        currentPageLabel: t("media_list"),
    };

    switch (route.name) {
        // case "home":
        case "map_list":
            return { ...mapProps, currentPageLabel: t(route.name) };
        case "media_list":
            return { ...mediaProp, currentPageLabel: t(route.name) };

        default:
            return undefined;
    }
};

export default getBreadcrumb;
