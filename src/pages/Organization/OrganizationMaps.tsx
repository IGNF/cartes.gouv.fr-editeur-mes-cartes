import { FC } from "react";
import { symToStr } from "tsafe/symToStr";
import { api } from "@/api";
import PageNotFound from "../error/PageNotFound";
import { OrganizationLayoutChildrenProps } from "./OrganizationLayout";
import MapList from "@/pages/Map/MapList";

const OrganizationMaps: FC<OrganizationLayoutChildrenProps> = ({ organizationId, role }) => {
    const { data: organization } = api.organization.useGetOrganizationsById(organizationId, {
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
    // const isOpen = useIsModalOpen(confirmDeleteMapModal);

    return organization && organization.public_id ? <MapList organizationId={organization.public_id} role={role}></MapList> : <PageNotFound />;
};

OrganizationMaps.displayName = symToStr({ OrganizationMaps });
export default OrganizationMaps;
