import mapsApi from "@/api/maps";
import type { MapsSearchParams } from "@/api/types";
import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

export default function useMapsQuery(params: MapsSearchParams = {}) {
    return useQuery({
        queryKey: RQKeys.maps(params),
        queryFn: ({ signal }) => mapsApi.search(params, signal),
    });
}
