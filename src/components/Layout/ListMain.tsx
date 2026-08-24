import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useHead } from "@unhead/react";
import { PropsWithChildren } from "react";
import { tss } from "tss-react";

import AppSideMenu from "@/components/Layout/AppSideMenu";
import useBreadcrumb from "@/hooks/useBreadcrumb";
import SessionExpiredAlert from "../Utils/SessionExpiredAlert";
import { type MainProps } from "./Main";

export type ListMainProps = PropsWithChildren<
    MainProps
> & {
    classes?: Partial<MainProps["classes"] & Record<"content", string>>,
    organizationId?: string
};

export default function ListMain(props: ListMainProps) {
    const { children, customBreadcrumbProps, title, classes: propsClasses, organizationId } = props;

    useHead({
        titleTemplate: "%s | cartes.gouv.fr",
        title: title,
    });
    const breadcrumbProps = useBreadcrumb(customBreadcrumbProps);

    const { classes } = useStyles();

    return (
        <main id="main" role="main">
            <div className={propsClasses?.container ?? fr.cx("fr-container")}>
                <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-grid-row--center")}>
                    <div
                        className={cx(fr.cx("fr-col-12", "fr-col-md-3"), classes?.sideMenuCol)}
                    >
                        <AppSideMenu organizationId={organizationId} />
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

const useStyles = tss.withName({ ListMain }).create({
    sideMenuCol: {
        display: "flex",
        flexDirection: "column",
        gap: fr.spacing("10v"),
        [fr.breakpoints.up("md")]: {
            borderRight: `1px solid ${fr.colors.decisions.border.default.grey.default}`,
        }
    },
    content: {
        padding: "0 1rem",
    },
});
