import mediasApi from "@/api/medias";
import type { MediasSearchParams } from "@/api/types";
import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

export default function useMediasQuery(params: MediasSearchParams = {}) {
    return useQuery({
        queryKey: RQKeys.medias(params),
        queryFn: ({ signal }) => mediasApi.list(params, signal),
    });
}

export function useMediaFoldersQuery(organizationId?: string) {
    return useQuery({
        queryKey: RQKeys.media_folders(organizationId),
        queryFn: ({ signal }) => mediasApi.getFolders(organizationId, signal),
    });
}
