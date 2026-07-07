import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb, BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";
import { useHead } from "@unhead/react";
import { PropsWithChildren, memo } from "react";

import useBreadcrumb from "@/hooks/useBreadcrumb";
import SessionExpiredAlert from "../Utils/SessionExpiredAlert";

export interface MainProps {
    customBreadcrumbProps?: BreadcrumbProps;
    title?: string;
    classes?: Partial<Record<"container", string>>;
}

function Main(props: PropsWithChildren<MainProps>) {
    const { children, customBreadcrumbProps, title, classes } = props;

    useHead({
        titleTemplate: "%s | cartes.gouv.fr",
        title: title,
    });
    const breadcrumbProps = useBreadcrumb(customBreadcrumbProps);

    return (
        <main id="main" role="main">
            {/* doit être le premier élément atteignable après le lien d'évitement (Accessibilité) : https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/bandeau-d-information-importante */}

            <div className={classes?.container ?? fr.cx("fr-container")}>
                {breadcrumbProps && <Breadcrumb {...breadcrumbProps} />}

                <SessionExpiredAlert />

                {children}
            </div>
        </main>
    );
}

export default memo(Main);
