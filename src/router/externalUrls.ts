import { type RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

export const externalUrls = {
    help: "/aide/",
    helpProducerGuide: "/aide/fr/guides-producteur/",
    helpProducerGuideGeneral: "/aide/fr/guides-producteur/presentation-producteur/generalites-producteur/",
    helpUserGuideExploreMaps: "/aide/fr/guides-utilisateur/visualiseur-cartographique/generalites-visualiseur/",
    helpUserGuideCatalogueGeneral: "/aide/fr/guides-utilisateur/rechercher-une-donnee/generalites-catalogue/",
    helpUserGuideGeopfServicesTutorial: "/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/tutoriels/",
    helpProducerGuideCreateDatasheet: "/aide/fr/guides-producteur/publier-des-donnees-via-cartes-gouv/deposer-donnees-sur-cartes-gouv/",
    helpUserGuideCreateKeys: "/aide/fr/guides-utilisateur/creation-des-cles-et-integration-sig/",
    helpUserGuideCreateMap: "/aide/fr/guides-utilisateur/creer-une-carte/",
    maps: "/explorer-les-cartes",
    map_list: "/cartes",
    contact_us: "/aide/fr/nous-ecrire",
    discover_cartesgouvfr: "/decouvrir",
    catalogue: "/rechercher-une-donnee/search",
    present_service_maps: "/decouvrir/explorer-les-cartes",
    present_service_catalogue: "/decouvrir/rechercher-une-donnee",
    present_service_publish: "/decouvrir/publier-une-donnee",
    offers: "/offres",
    join_cartesgouvfr_community: "/nous-rejoindre",
    news_list: "/actualites",
    service_status: "/aide/fr/niveau-de-service",
    personal_data: "/donnees-personnelles",
    accessibility: "/accessibilite",
    terms_of_service: "/cgu",
    legal_notice: "/mentions-legales",
    sitemap: "/plan-du-site",
    newsletterSubscription: "/lettre-d-information",
    dashboard: "/tableau-de-bord",
    my_account: "/tableau-de-bord/mon-compte",
    community_geopf_cartesgouvfr_expertises_territoires: "https://www.expertises-territoires.fr/jcms/pl1_557493/fr/communaute-geoplateforme-et-cartes-gouv",
    roadmap: "/evolutions",
} as const;

export function externalLink(route: keyof typeof externalUrls, title?: string): RegisteredLinkProps {
    return {
        href: externalUrls[route],
        rel: "noopener external",
        target: "_blank",
        title: title ? `${title} - nouvelle fenêtre` : "Nouvelle fenêtre",
    };
}
