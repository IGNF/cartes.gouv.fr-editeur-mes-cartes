import { JSX, lazy, useMemo } from "react";
import { Route } from "type-route";

import { groups } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import AppLayout from "@/components/Layout/AppLayout";

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
                    render: <OrganizationList />,
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
