import { createContext, ReactNode, use, useMemo } from "react";

import { Organization } from "@/api/model";

export interface IOrganizationContext {
    organization?: Organization;
    isFetching: boolean;
    status: "error" | "success" | "pending";
}

export const OrganizationContext = createContext<IOrganizationContext>({
    organization: undefined,
    isFetching: false,
    status: "pending",
});

export function useOptionalOrganization() {
    return use(OrganizationContext);
}

export function useOrganization() {
    const context = use(OrganizationContext);
    if (!context.organization) {
        throw new Error("useOrganization must be used within an OrganizationProvider");
    }
    return context as Required<IOrganizationContext>;
}

interface IOrganizationProviderProps {
    children: ReactNode;
    organization?: Organization;
    isFetching: boolean;
    status: "error" | "success" | "pending";
}

export function OrganizationProvider(props: IOrganizationProviderProps) {
    const { children, organization, isFetching, status } = props;
    const context = useMemo(() => ({ organization, isFetching, status }), [organization, isFetching, status]);

    return <OrganizationContext value={context}>{children}</OrganizationContext>;
}
