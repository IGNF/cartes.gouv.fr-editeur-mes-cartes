import api from "@/api";
import placeholder16x9 from "@/img/placeholder.16x9.png";
import RQKeys from "@/modules/maps/RQKeys";
import { useQuery } from "@tanstack/react-query";

// Permet récupèrer les thèmes des cartes (avec le nombre)
export function useImage(uri?: string | null): string {
  const URL_REGEX = /[http]?s?:\/\/[^\s]+/g;
  if (!uri || uri === "") {
    // Image par défaut
    return placeholder16x9;
  } else if (URL_REGEX.test(uri)) {
    return uri;
  } else {
    // C'est une image importée
    const imageQuery = useQuery({
        queryKey: RQKeys.medias(),
        queryFn: ({ signal }) => api.medias.getImage(uri, signal),
        staleTime: 60000,
    });
    const { data } = imageQuery;
    // Le fichier a été trouvé
    if (data) {
      return data;
    } else {
      return placeholder16x9;
    }
  }
}
