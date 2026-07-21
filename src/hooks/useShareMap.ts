import { MapList } from "@/api/model";
import { externalUrls } from "@/router/externalUrls";
import { routes } from "@/router/router";

/**
 * Retourne le lien permettant de visualiser la carte
 * @param map Carte contenant les informations
 */
export function useMapLink(map: MapList): string {
    if (!map.view_id) {
        return "";
    }
    return routes.view_map({ mapId: map.view_id }).href;
}

/**
 * Retourne l'uframe permettant de visualiser la carte
 * @param map Carte contenant les informations
 */
export function useMapIframe(map: MapList): string {
    const link = useMapLink(map);
    return `<iframe
width="600" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
sandbox="allow-forms allow-scripts allow-same-origin"
src="${link}">
allowfullscreen>
</iframe>`;
}