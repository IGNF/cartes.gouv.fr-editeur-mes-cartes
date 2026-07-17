import { api } from "@/api";
import placeholder16x9 from "@/img/placeholder.16x9.png";
// import RQKeys from "@/modules/maps/RQKeys";
// import { useQuery } from "@tanstack/react-query";

// Permet récupèrer les thèmes des cartes (avec le nombre)
export function useImage(uri?: string | null): any {
  const URL_REGEX = /[http]?s?:\/\/[^\s]+/g;
  if (!uri || uri === "") {
    // Image par défaut
    return placeholder16x9;
  } else if (URL_REGEX.test(uri)) {
    return uri;
  } else {
    // C'est une image importée
    const { data } = api.media.useGetImageByFilename(uri, {
      query: {
        // Évite les erreurs typescript en vérifiant le bon retour
        select: (response) => {
          if (response.status === 200) {
            return response.data
          } else {
            return placeholder16x9
          }
        },
      }
    });
    return data;
  }
}
