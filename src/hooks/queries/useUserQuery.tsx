import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

/**
 * Seule source de vérité pour les données de l'utilisateur.
 * Contrat: data === null => anonyme, data objet => authentifié.
 * L'état de chargement doit être lu via les flags React Query (isPending, status...), pas via undefined.
 */
export default function useUserQuery() {
    return useQuery({
        queryKey: RQKeys.user_me(),
        queryFn: ({ signal }) => !!signal.aborted,
    });
}
