import mapsApi from "@/api/maps";
import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

export default function useMapViewQuery(viewId?: string) {
    return useQuery({
        queryKey: RQKeys.map_view(viewId ?? ""),
        queryFn: ({ signal }) => mapsApi.getView(viewId as string, signal),
        enabled: Boolean(viewId),
    });
}
