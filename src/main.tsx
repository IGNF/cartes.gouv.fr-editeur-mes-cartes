import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { createHead, UnheadProvider } from "@unhead/react/client";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { RouteProvider } from "./router/router";
// en prod
if (import.meta.env?.APP_ENV?.toLowerCase() === "prod") {
    disableReactDevTools();
} else {
    document.getElementsByClassName("sf-toolbar")?.[0]?.classList?.remove("sf-display-none");
}

startReactDsfr({ defaultColorScheme: "system" });

const head = createHead();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <UnheadProvider head={head}>
            <RouteProvider>
                <App />
            </RouteProvider>
        </UnheadProvider>
    </React.StrictMode>
);
