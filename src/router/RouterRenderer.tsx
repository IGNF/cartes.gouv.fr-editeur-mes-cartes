import { FC, Suspense } from "react";

import AppLayout from "../components/Layout/AppLayout";
import Main from "../components/Layout/Main";
import LoadingText from "../components/Utils/LoadingText";
import GroupApp from "./GroupApp";
import { useRoute } from "./router";

const RouterRenderer: FC = () => {
    const route = useRoute();

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
            <GroupApp route={route} />
        </Suspense>
    );
};

export default RouterRenderer;
