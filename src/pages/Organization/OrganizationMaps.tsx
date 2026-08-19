import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Card from "@codegouvfr/react-dsfr/Card";
import { FC, ReactNode } from "react";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { symToStr } from "tsafe/symToStr";

import { useImage } from "@/hooks/useImage";
import { GetOrganizationsMe200Item } from "@/api/model";
import { useTranslation } from "@/i18n";
import { UserRole } from "@/types/UserRole";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { api } from "@/api";
import ListMain from "@/components/Layout/ListMain";
import PageTitle from "@/components/Layout/PageTitle";
import PageNotFound from "../error/PageNotFound";
import OrganizationTertiaryNavigation from "./OrganizationTertiaryNavigation";

type OrganizationMapsProps = {
    organizationId: string,
    footer?: ReactNode
};

const OrganizationMaps: FC<OrganizationMapsProps> = ({ organizationId, footer }) => {
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
    // const isOpen = useIsModalOpen(confirmDeleteMapModal);

    return (
        organization && organization.public_id ? (
            <div>
                <p>Cartes</p>
            </div>

        ) : (
            <PageNotFound />
        )
    );
};

OrganizationMaps.displayName = symToStr({ OrganizationMaps });
export default OrganizationMaps;
