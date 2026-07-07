import themesApi from "@/api/themes";
import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

export default function useThemesQuery() {
    return useQuery({
        queryKey: RQKeys.themes(),
        queryFn: ({ signal }) => themesApi.list(signal),
    });
}
