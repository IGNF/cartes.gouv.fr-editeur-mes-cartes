import { BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { useMemo } from "react";

import { useOptionalOrganization } from "@/contexts/organization";
import getBreadcrumb from "../modules/breadcrumbs/Breadcrumb";
import { useRoute } from "../router/router";

export default function useBreadcrumb(customBreadcrumbProps?: BreadcrumbProps) {
    const route = useRoute();
    const { organization } = useOptionalOrganization();

    return useMemo(() => {
        if (customBreadcrumbProps !== undefined) {
            return customBreadcrumbProps;
        }

        return getBreadcrumb(route, organization);
    }, [route, organization, customBreadcrumbProps]);
}
