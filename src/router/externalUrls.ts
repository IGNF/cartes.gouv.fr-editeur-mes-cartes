import { type RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

export const externalUrls = {
    accessibility: "/accessibilite",
    catalogue: "/rechercher-une-donnee/search",
    contact_us: "/aide/fr/nous-ecrire",
    create_map: "/creer-une-carte",
    dashboard: "/tableau-de-bord",
    discover_cartesgouvfr: "/decouvrir",
    help: "/aide/",
    helpProducerGuide: "/aide/fr/guides-producteur/",
    helpUserGuideCreateMap: "/aide/fr/guides-utilisateur/creer-une-carte/",
    legal_notice: "/mentions-legales",
    maps: "/explorer-les-cartes",
    map_list: "/tableau-de-bord/editeur",
    my_account: "/tableau-de-bord/mon-compte",
    personal_data: "/donnees-personnelles",
    service_status: "/aide/fr/niveau-de-service",
    sitemap: "/plan-du-site",
    terms_of_service: "/cgu",
};

export function externalLink(route: keyof typeof externalUrls, title?: string): RegisteredLinkProps {
    return {
        href: externalUrls[route],
        rel: "noopener external",
        target: "_blank",
        title: title ? `${title} - nouvelle fenêtre` : "Nouvelle fenêtre",
    };
}
