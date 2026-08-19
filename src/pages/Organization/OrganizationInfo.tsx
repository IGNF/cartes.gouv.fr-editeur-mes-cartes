
import { FC } from "react";
import { symToStr } from "tsafe/symToStr";
import { api } from "@/api";
import PageNotFound from "../error/PageNotFound";
import { OrganizationLayoutChildrenProps } from "./OrganizationLayout";

const OrganizationInfo: FC<OrganizationLayoutChildrenProps> = ({ organizationId, role }) => {
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
            <> {role}</>
        ) : (
            <PageNotFound />
        )
    );
};

OrganizationInfo.displayName = symToStr({ OrganizationInfo });
export default OrganizationInfo;
