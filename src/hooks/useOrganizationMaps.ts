import { api } from "@/api";
import { GetMapsParams, MapResearch } from "@/api/model";
import { UserRole } from "@/types/UserRole";

type OrganizationMapsData = Pick<MapResearch, "count" | "maps">;


// Permet de renvoyer les éléments nécessaires pour MapList
type UseOrganizationMapsResult = {
    data: OrganizationMapsData;
    dataUpdatedAt: number;
    isFetching: boolean;
    isLoading: boolean;
    refetch: () => Promise<void>;
};

/**
 * Hooks permettant d'envoyer deux requêtes pour une organisation
 * Une avec context=profile et l'autre context=organization;
 */
export function useOrganizationMaps(role: UserRole | undefined, organizationId: string | undefined, params: GetMapsParams): UseOrganizationMapsResult {

    const context = role === UserRole.MEMBER ? "organization" : "profile";
    const isEditor = role === UserRole.EDITOR;
    const isOrganizationMapsEnabled = isEditor && organizationId !== undefined;
    const organizationMapsParams = isEditor ? { ...params, context: "organization", organization: organizationId } : undefined;

    // Cartes de l'utilisateur dans l'organisation
    const userQuery = api.map.useGetMaps(
        { ...params, context: context, organization: organizationId },
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200 || response.status === 206) {
                        return response.data
                    }
                    else {
                        return undefined
                    }
                },
            },
        },
    );

    // Relance automatiquement une requête si c'est un éditeur pour avoir toutes les cartes
    // de l'organisation
    const organizationQuery = api.map.useGetMaps(
        organizationMapsParams,
        {
            query: {
                enabled: isOrganizationMapsEnabled,
                queryKey: ["organization-maps", organizationMapsParams ?? null],
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200 || response.status === 206) {
                        return {
                            ...response.data,
                            maps: response.data.maps.filter(map => map.share !== "public"),
                        }
                    }
                    else {
                        return undefined
                    }
                },
            },
        },
    );

    // Fusionne les résultats
    const userMaps = userQuery.data?.maps || [];
    const organisationMaps = organizationQuery.data?.maps || [];
    const data = {
        maps: userMaps.concat(organisationMaps),
        count: userMaps.length + organisationMaps.length,
    };

    return {
        data,
        dataUpdatedAt: Math.max(userQuery.dataUpdatedAt, organizationQuery.dataUpdatedAt),
        isFetching: userQuery.isFetching || organizationQuery.isFetching,
        isLoading: userQuery.isLoading || (isOrganizationMapsEnabled && organizationQuery.isLoading),
        refetch: async () => {
            await Promise.all([
                userQuery.refetch(),
                ...(isOrganizationMapsEnabled ? [organizationQuery.refetch()] : []),
            ]);
        },
    };
}