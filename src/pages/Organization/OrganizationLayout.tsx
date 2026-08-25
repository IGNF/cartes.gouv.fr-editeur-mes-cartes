import { api } from "@/api";
import ListMain from "@/components/Layout/ListMain";
import PageTitle from "@/components/Layout/PageTitle";
import { OrganizationProvider } from "@/contexts/organization";
import { addNoticeTranslations } from "@codegouvfr/react-dsfr/Notice";
import { FC, PropsWithChildren, ReactNode, memo } from "react";
import OrganizationTertiaryNavigation from "./OrganizationTertiaryNavigation";
import PageNotFound from "../error/PageNotFound";
import { UserRole } from "@/types/UserRole";
import { useTranslation } from "@/i18n";

export interface OrganizationLayoutChildrenProps {
    organizationId: string;
    role?: UserRole;
}

export interface OrganizationLayoutProps extends OrganizationLayoutChildrenProps {
    children: ReactNode;
}

const OrganizationLayout: FC<PropsWithChildren<OrganizationLayoutProps>> = ({ organizationId, role, children }) => {
    const { t } = useTranslation("Organization");

    const {
        data: organization,
        isFetching,
        status,
    } = api.organization.useGetOrganizationsById(organizationId, {
        query: {
            // Évite les erreurs typescript en vérifiant le bon retour
            select: (response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return undefined;
                }
            },
        },
    });

    return organization && organization.public_id ? (
        <OrganizationProvider organization={organization} isFetching={isFetching} status={status}>
            <ListMain title={organization.name} organizationId={organization.public_id}>
                <PageTitle title={organization.name}>
                    {role && (
                        <>
                            Rôle : {t("user-role", role)} ({role})
                        </>
                    )}
                </PageTitle>
                <OrganizationTertiaryNavigation organizationId={organization.public_id} />
                {children}
            </ListMain>
        </OrganizationProvider>
    ) : (
        <PageNotFound />
    );
};

export default memo(OrganizationLayout);

addNoticeTranslations({
    lang: "fr",
    messages: {
        "hide message": "Fermer",
    },
});
