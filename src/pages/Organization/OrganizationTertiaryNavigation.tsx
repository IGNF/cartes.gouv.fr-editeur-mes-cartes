import TertiaryNavigation from "@/components/Layout/TertiaryNavigation";
import { routes, useRoute } from "@/router/router";

type OrganizationTertiaryNavigationProps = {
    organizationId: string;
};

// Adapté depuis la n

export default function OrganizationTertiaryNavigation(props: OrganizationTertiaryNavigationProps) {
    const { organizationId } = props;
    const { name: routeName } = useRoute();

    return (
        <TertiaryNavigation
            items={[
                {
                    text: "Cartes",
                    linkProps: routes.organization_maps({ organizationId }).link,
                    isActive: routeName === "organization_maps",
                },
                {
                    text: "Membres",
                    linkProps: routes.organization_members({ organizationId }).link,
                    isActive: routeName === "organization_members",
                },
                {
                    text: "Infos",
                    linkProps: routes.organization_info({ organizationId }).link,
                    isActive: routeName === "organization_info",
                },
            ]}
        />
    );
}
