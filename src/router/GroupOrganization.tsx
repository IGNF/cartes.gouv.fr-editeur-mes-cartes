import { JSX, lazy, useMemo } from "react";
import { Route } from "type-route";

import { groups } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import AppLayout from "@/components/Layout/AppLayout";
import OrganizationInfo from "@/pages/Organization/OrganizationInfo";
import OrganizationMaps from "@/pages/Organization/OrganizationMaps";
import OrganizationMembers from "@/pages/Organization/OrganizationMembers";
import OrganizationLayout from "@/pages/Organization/OrganizationLayout";
import { useUserRole } from "@/hooks/useUserRole";

const OrganizationList = lazy(() => import("@/pages/Organization/OrganizationList"));

interface GroupAppProps {
    route: Route<typeof groups.organization>;
}

function GroupOrganization(props: GroupAppProps) {
    const { route } = props;
    const organizationId = "organizationId" in route.params ? route.params.organizationId : undefined;
    const role = useUserRole(organizationId);

    const content: { render: JSX.Element } | undefined = useMemo(() => {
        switch (route.name) {
            case "organization_list":
                return {
                    render: <OrganizationList />,
                };
            // Fallthrough intentionnel
            case "organization_maps":
                return {
                    render: (
                        <OrganizationLayout organizationId={route.params.organizationId} role={role}>
                            <OrganizationMaps organizationId={route.params.organizationId} role={role} />
                        </OrganizationLayout>
                    ),
                };
            case "organization_members":
                return {
                    render: (
                        <OrganizationLayout organizationId={route.params.organizationId} role={role}>
                            <OrganizationMembers organizationId={route.params.organizationId} role={role} />
                        </OrganizationLayout>
                    ),
                };
            case "organization_info":
                return {
                    render: (
                        <OrganizationLayout organizationId={route.params.organizationId} role={role}>
                            <OrganizationInfo organizationId={route.params.organizationId} role={role} />
                        </OrganizationLayout>
                    ),
                };
            default:
                return undefined;
        }
    }, [route, role]);

    if (!content) {
        return <PageNotFoundWithLayout />;
    }
    return <AppLayout>{content.render}</AppLayout>;
}

export default GroupOrganization;
