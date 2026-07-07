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

    switch (route.name) {
        default:
            return undefined;
    }
};

export default getBreadcrumb;
