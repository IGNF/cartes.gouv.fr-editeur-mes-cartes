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

type OrganizationMembersProps = {
    organizationId: string,
    footer?: ReactNode
};

const OrganizationMembers: FC<OrganizationMembersProps> = ({ organizationId, footer }) => {
    const { t } = useTranslation("Organization");

    const { data: organization, isFetching, isLoading, refetch } = api.organization.useGetOrganizationsById(
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

    const roleOrder: Record<string, number> = {
        owner: 0,
        editor: 1,
        member: 2,
    };
    // const isOpen = useIsModalOpen(confirmDeleteMapModal);

    return (
        organization ? (
            <Table
                caption={`Membres de l'espace ${organization.name}`}
                headers={[
                    "Nom",
                    "Rôle"
                ]}
                data={[...(organization.members ?? [])]
                    .sort((memberA, memberB) => {
                        return (roleOrder[memberA.role || 2] ?? 999) - (roleOrder[memberB.role || 2] ?? 999);
                    })
                    .map((member) => [
                        member.public_name,
                        t('user-role', member.role as UserRole)
                    ])}>

            </Table>

        ) : (
            <PageNotFound />
        )
    );
};

OrganizationMembers.displayName = symToStr({ OrganizationMembers });
export default OrganizationMembers;
