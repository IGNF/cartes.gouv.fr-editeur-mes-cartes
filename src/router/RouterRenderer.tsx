import { FC, JSX, Suspense, useMemo } from "react";

import AppLayout from "../components/Layout/AppLayout";
import Main from "../components/Layout/Main";
import LoadingText from "../components/Utils/LoadingText";
import GroupMap from "./GroupMap";
import { groups, knownRoutes, useRoute } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import GroupApp from "./GroupApp";

const RouterRenderer: FC = () => {
    const route = useRoute();

    const content: JSX.Element = useMemo(() => {
        // vérification si la route demandée est bien connue/enregistrée
        if (route.name === false || !knownRoutes.includes(route.name) || route.name === "page_not_found") {
            return <PageNotFoundWithLayout />;
        }

        // // vérifier si l'utilisateur est authentifié et éventuellement ses droits à la ressource demandée
        // if (!groups.public.has(route) && !user) {
        //     return <RedirectToLogin />;
        // }


        if (groups.map.has(route)) {
            return <GroupMap route={route} />;
        }

        return <GroupApp route={route} />;
    }, [route]);

    return (
        <Suspense
            fallback={
                <AppLayout>
                    <Main>
                        <LoadingText />
                    </Main>
                </AppLayout>
            }
        >
            {content}
        </Suspense>
    );
};

export default RouterRenderer;
