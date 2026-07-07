import { JSX, lazy, useMemo } from "react";
import { Route } from "type-route";

import AppLayout from "../components/Layout/AppLayout";
import Main from "../components/Layout/Main";
import { knownRoutes, routes } from "./router";

const MyMaps = lazy(() => import("@/pages/Maps/MyMaps"));

interface GroupAppProps {
    route: Route<typeof routes>;
}

function GroupApp({ route }: GroupAppProps) {
    const content: JSX.Element = useMemo(() => {
        if (route.name === false || !knownRoutes.includes(route.name)) {
            return (
                <AppLayout>
                    <Main>
                        <h1>Page non trouvée</h1>
                        <p>La page que vous cherchez n'existe pas.</p>
                    </Main>
                </AppLayout>
            );
        }

        switch (route.name) {
            case "my_maps":
                return (
                    <AppLayout>
                        <MyMaps />
                    </AppLayout>
                );
            default:
                return (
                    <AppLayout>
                        <Main>
                            <h1>Page non trouvée</h1>
                            <p>La page que vous cherchez n'existe pas.</p>
                        </Main>
                    </AppLayout>
                );
        }
    }, [route]);

    return content;
}

export default GroupApp;
