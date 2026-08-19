import { api } from "@/api";
import ListMain from "@/components/Layout/ListMain";
import PageTitle from "@/components/Layout/PageTitle";
import { useTranslation } from "@/i18n";
import { addNoticeTranslations } from "@codegouvfr/react-dsfr/Notice";
import { useSeoMeta } from "@unhead/react";
import { FC, PropsWithChildren, ReactNode, memo } from "react";
import OrganizationTertiaryNavigation from "./OrganizationTertiaryNavigation";
import PageNotFound from "../error/PageNotFound";

export interface OrganizationLayoutProps {
    organizationId: string,
    children: ReactNode
};

const OrganizationLayout: FC<PropsWithChildren<OrganizationLayoutProps>> = ({ organizationId, children }) => {
    const { t } = useTranslation("Organization");

    const { data: organization } = api.organization.useGetOrganizationsById(
        organizationId,
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200) {
                        return response.data
                    }
                    else {
                        return undefined
                    }
                },
            },
        },
    );

    return (
        organization && organization.public_id ? (
            <ListMain title={organization.name} organizationId={organization.public_id}>
                <PageTitle title={organization.name}>
                </PageTitle>
                <OrganizationTertiaryNavigation organizationId={organization.public_id} />
                {children}
            </ListMain>
        ) : (
            <PageNotFound />
        )
    );
};

export default memo(OrganizationLayout);

addNoticeTranslations({
    lang: "fr",
    messages: {
        "hide message": "Fermer",
    },
});
