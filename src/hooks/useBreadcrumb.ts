import { BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { useMemo } from "react";

import getBreadcrumb from "../modules/breadcrumbs/Breadcrumb";
import { useRoute } from "../router/router";

export default function useBreadcrumb(customBreadcrumbProps?: BreadcrumbProps) {
    const route = useRoute();

    return useMemo(() => {
        if (customBreadcrumbProps !== undefined) {
            return customBreadcrumbProps;
        }

        return getBreadcrumb(route);
    }, [route, customBreadcrumbProps]);
}
