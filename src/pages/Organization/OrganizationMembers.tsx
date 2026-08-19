import { FC } from "react";
import { Table } from "@codegouvfr/react-dsfr/Table";
import { symToStr } from "tsafe/symToStr";

import { useTranslation } from "@/i18n";
import { UserRole } from "@/types/UserRole";
import { api } from "@/api";
import PageNotFound from "../error/PageNotFound";
import { OrganizationLayoutChildrenProps } from "./OrganizationLayout";

const OrganizationMembers: FC<OrganizationLayoutChildrenProps> = ({ organizationId, role }) => {
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
