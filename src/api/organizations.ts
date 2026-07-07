import type { Organization, OrganizationMembership, OrganizationRole } from "./types";
import { get } from "./client";

const getById = (organizationId: string, signal?: AbortSignal): Promise<Organization> =>
    get<Organization>(`/organizations/${encodeURIComponent(organizationId)}`, { signal });

const getMine = (signal?: AbortSignal): Promise<OrganizationMembership[]> =>
    get<OrganizationMembership[]>("/organizations/me", { signal });

const getRoles = (signal?: AbortSignal): Promise<OrganizationRole[]> =>
    get<OrganizationRole[]>("/organizations/roles", { signal });

const organizations = {
    getById,
    getMine,
    getRoles,
};

export default organizations;
