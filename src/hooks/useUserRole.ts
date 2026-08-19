import { api } from "@/api";
import { UserRole } from "@/types/UserRole";

export function useUserRole(organizationId?: string): UserRole | undefined {
    if (!organizationId) {
        return undefined;
    }
    const { data: organizations } = api.organization.useGetOrganizationsMe(
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

    if (organizations) {
        const org = organizations.find((org) => org.public_id === organizationId);
        return org?.user_role as UserRole;
    } else {
        return undefined;
    }

}
