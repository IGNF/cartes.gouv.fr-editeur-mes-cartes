import { BreadcrumbProps, addBreadcrumbTranslations } from "@codegouvfr/react-dsfr/Breadcrumb";
import { Route } from "type-route";

import { getTranslation } from "../../i18n/i18n";
import { routes } from "../../router/router";
import { Organization } from "@/api/model";

const { t } = getTranslation("Breadcrumb");

const getBreadcrumb = (route: Route<typeof routes>, organization?: Organization): BreadcrumbProps | undefined => {
    addBreadcrumbTranslations({
        lang: "fr",
        messages: { home: t("dashboard") },
    });

    // Nom de l'espace de travail
    const isOrganizationDetailRoute = route.name === "organization_maps" || route.name === "organization_members" || route.name === "organization_info";
    const organizationSegment = isOrganizationDetailRoute ? {
        label: organization?.name ?? route.params.organizationId,
        linkProps: routes.organization_maps({ organizationId: route.params.organizationId }).link,
    } : undefined;

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

    const organizationBaseProp: BreadcrumbProps = {
        homeLinkProps: routes.home().link,
        // segments: [{ label: t("dashboard"), linkProps: routes.dashboard().link }],
        segments: [],
        currentPageLabel: t("organization_list"),
    };


    const organizationProp: BreadcrumbProps = {
        homeLinkProps: routes.home().link,
        // segments: [{ label: t("dashboard"), linkProps: routes.dashboard().link }],
        segments: [
            ...organizationBaseProp.segments,
            { label: t("organization_list"), linkProps: routes.organization_list().link },
            organizationSegment,
        ].filter(Boolean) as BreadcrumbProps["segments"],
        currentPageLabel: t("organization_list"),
    };

    switch (route.name) {
        // case "home":
        case "map_list":
            return { ...mapProps, currentPageLabel: t(route.name) };
        case "media_list":
            return { ...mediaProp, currentPageLabel: t(route.name) };
        case "organization_list":
            return { ...organizationBaseProp, currentPageLabel: t(route.name) }
        case "organization_maps":
            return {
                ...organizationProp,
                segments: [
                    ...organizationBaseProp.segments,
                    { label: t("organization_list"), linkProps: routes.organization_list().link },
                ],
                currentPageLabel: organizationSegment?.label
            }
        case "organization_info":
        case "organization_members":
            return { ...organizationProp, currentPageLabel: t(route.name) }

        default:
            return undefined;
    }
};

export default getBreadcrumb;
