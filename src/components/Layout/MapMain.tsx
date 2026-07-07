import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useHead } from "@unhead/react";
import { PropsWithChildren } from "react";
import { tss } from "tss-react";

import MapSideMenu from "@/components/Layout/MapSideMenu";
import useBreadcrumb from "@/hooks/useBreadcrumb";
import SessionExpiredAlert from "../Utils/SessionExpiredAlert";
import { type MainProps } from "./Main";

export type DatastoreMainProps = PropsWithChildren<
    MainProps
> & {
    classes?: Partial<MainProps["classes"] & Record<"content", string>>;
};

export default function DatastoreMain(props: DatastoreMainProps) {
    const {children, customBreadcrumbProps, title, classes: propsClasses } = props;

    useHead({
        titleTemplate: "%s | cartes.gouv.fr",
        title: title,
    });
    const breadcrumbProps = useBreadcrumb(customBreadcrumbProps);

    const { classes } = useStyles();

    // const { sandboxDatastore } = useDatastoreSelection();
    // if (!sandboxDatastore) {
    //     return (
    //         <Main>
    //             <LoadingText />
    //         </Main>
    //     );
    // }

    return (
        <main id="main" role="main">
            <div className={propsClasses?.container ?? fr.cx("fr-container")}>
                <div className={fr.cx("fr-grid-row")}>
                    <div
                        className={cx(fr.cx("fr-col-12", "fr-col-md-3"), classes?.sideMenuCol)}
                    >
                        <MapSideMenu />
                    </div>
                    <div className={cx(fr.cx("fr-col-12", "fr-col-md-9"), classes.content, propsClasses?.content)}>
                        {/* // "fr-px-5w" */}
                        {breadcrumbProps && <Breadcrumb {...breadcrumbProps} />}
                        <SessionExpiredAlert />
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}

const useStyles = tss.withName({ DatastoreMain }).create({
    sideMenuCol: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("10v"),
        borderRight: `1px solid ${fr.colors.decisions.border.default.grey.default}`,
    },
    content: {
        padding: "0 1rem",
    },
});
