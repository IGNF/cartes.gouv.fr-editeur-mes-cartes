import { JSX, lazy, useMemo } from "react";
import { Route } from "type-route";

import { groups } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import AppLayout from "@/components/Layout/AppLayout";

const MapList = lazy(() => import("@/pages/MapList/MapList"));

interface GroupAppProps {
    route: Route<typeof groups.map | typeof groups.public>;
}

function GroupMap(props: GroupAppProps) {
    const { route } = props;

    const content: { render: JSX.Element } | undefined = useMemo(() => {
        switch (route.name) {
            case "home":
            case "map_list":
                return {
                    render: <MapList />,
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

export default GroupMap;
