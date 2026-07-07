import { JSX, useMemo } from "react";
import { Route } from "type-route";

import AppLayout, { AppLayoutProps } from "../components/Layout/AppLayout";
import PageNotFoundWithLayout from "../pages/error/PageNotFoundWithLayout";
import { routes } from "./router";


interface IGroupAppProps {
    route: Route<typeof routes>;
}

function GroupApp(props: IGroupAppProps) {
    const { route } = props;

    const content: { render: JSX.Element; layoutProps?: AppLayoutProps } | undefined = useMemo(() => {
        switch (route.name) {
            case "page_not_found":
                return {
                    render: <PageNotFoundWithLayout />,
                };
        }
    }, [route]);

    if (!content) {
        return <PageNotFoundWithLayout />;
    }

    return (
        <AppLayout {...content?.layoutProps}>
            {content.render}
        </AppLayout>
    );
}

export default GroupApp;
