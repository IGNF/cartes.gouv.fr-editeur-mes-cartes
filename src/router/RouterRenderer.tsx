import { FC, JSX, Suspense, useMemo } from "react";

import AppLayout from "../components/Layout/AppLayout";
import Main from "../components/Layout/Main";
import LoadingText from "../components/Utils/LoadingText";
import GroupMap from "./GroupMap";
import { groups, knownRoutes, routes, useRoute } from "./router";
import PageNotFoundWithLayout from "@/pages/error/PageNotFoundWithLayout";
import GroupApp from "./GroupApp";
// import GroupMedia from "./GroupMedia";
// import GroupOrganization from "./GroupOrganization";

const RouterRenderer: FC = () => {
    const route = useRoute();

    const content: JSX.Element = useMemo(() => {
        console.log(route.name);
        if (route.name === "home") {
            routes.map_list().push();
            // TODO : corriger breadcrumb ?
            return <GroupMap route={routes.map_list()} />;
        }
        // vérification si la route demandée est bien connue/enregistrée
        if (route.name === false || !knownRoutes.includes(route.name) || route.name === "page_not_found") {
            return <PageNotFoundWithLayout />;
        }
        // // vérifier si l'utilisateur est authentifié et éventuellement ses droits à la ressource demandée
        // if (!groups.public.has(route) && !user) {
        //     return <RedirectToLogin />;
        // }

        // Redirige l'uitilisateur de home vers /cartes
        if (groups.map.has(route)) {
            return <GroupMap route={route} />;
        }

        // if (groups.media.has(route)) {
        //     return <GroupMedia route={route} />;
        // }

        // if (groups.organization.has(route)) {
        //     return <GroupOrganization route={route} />;
        // }

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
