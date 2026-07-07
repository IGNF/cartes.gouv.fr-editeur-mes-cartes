import organizationsApi from "@/api/organizations";
import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

export function useMyOrganizationsQuery() {
    return useQuery({
        queryKey: RQKeys.organizations_me(),
        queryFn: ({ signal }) => organizationsApi.getMine(signal),
    });
}

export function useOrganizationRolesQuery() {
    return useQuery({
        queryKey: RQKeys.organizations_roles(),
        queryFn: ({ signal }) => organizationsApi.getRoles(signal),
    });
}

export function useOrganizationQuery(organizationId?: string) {
    return useQuery({
        queryKey: RQKeys.organization(organizationId ?? ""),
        queryFn: ({ signal }) => organizationsApi.getById(organizationId as string, signal),
        enabled: Boolean(organizationId),
    });
}
