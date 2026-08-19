import { JSX, lazy, useMemo } from "react";
import { Route } from "type-route";

import { groups } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import AppLayout from "@/components/Layout/AppLayout";
import MediaLayout from "@/pages/Media/MediaLayout";

const MediaList = lazy(() => import("@/pages/Media/MediaList"));

interface GroupAppProps {
    route: Route<typeof groups.media | typeof groups.public>;
}

function GroupMedia(props: GroupAppProps) {
    const { route } = props;

    const content: { render: JSX.Element } | undefined = useMemo(() => {
        switch (route.name) {
            case "media_list":
                return {
                    render:
                        <MediaLayout>
                            <MediaList />
                        </MediaLayout>,
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

export default GroupMedia;
