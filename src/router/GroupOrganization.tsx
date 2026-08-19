import { JSX, lazy, useMemo } from "react";
import { Route } from "type-route";

import { groups } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import AppLayout from "@/components/Layout/AppLayout";
import OrganizationInfo from "@/pages/Organization/OrganizationInfo";
import OrganizationMaps from "@/pages/Organization/OrganizationMaps";
import OrganizationMembers from "@/pages/Organization/OrganizationMembers";
import OrganizationLayout from "@/pages/Organization/OrganizationLayout";

const OrganizationList = lazy(() => import("@/pages/Organization/OrganizationList"));

interface GroupAppProps {
    route: Route<typeof groups.organization | typeof groups.public>;
}

function GroupOrganization(props: GroupAppProps) {
    const { route } = props;

    const content: { render: JSX.Element } | undefined = useMemo(() => {
        switch (route.name) {
            case "organization_list":
                return {
                    // render: <OrganizationList />,
                    render: <>
                        <OrganizationList />,
                    </>,

                };
            case "organization_maps":
                return {
                    render: 
                        <OrganizationLayout organizationId={route.params.organizationId} >
                            <OrganizationMaps organizationId={route.params.organizationId} />
                        </OrganizationLayout>
                    ,
                };
            case "organization_members":
                return {
                    render:
                        
                        <OrganizationLayout organizationId={route.params.organizationId} >
                            <OrganizationMembers organizationId={route.params.organizationId} />
                        </OrganizationLayout>
                    ,
                };
            case "organization_info":
                return {
                    render:
                        <OrganizationLayout organizationId={route.params.organizationId} >
                            <OrganizationInfo organizationId={route.params.organizationId} />
                        </OrganizationLayout>
                    ,
                };
            default:
                return undefined;
        }
    }, [route]);

    if (!content) {
        return <PageNotFoundWithLayout />;
    }
    return (
        <AppLayout >
            {content.render}
        </AppLayout>
    );
}

export default GroupOrganization;
