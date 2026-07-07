import { type RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";

import { catalogueUrl } from "@/env";
import { appRoot } from "./router";

export const externalUrls = {
    help: appRoot + "/aide/",
    helpProducerGuide: appRoot + "/aide/fr/guides-producteur/",
    helpProducerGuideGeneral: appRoot + "/aide/fr/guides-producteur/presentation-producteur/generalites-producteur/",
    helpUserGuideExploreMaps: appRoot + "/aide/fr/guides-utilisateur/visualiseur-cartographique/generalites-visualiseur/",
    helpUserGuideCatalogueGeneral: appRoot + "/aide/fr/guides-utilisateur/rechercher-une-donnee/generalites-catalogue/",
    helpUserGuideGeopfServicesTutorial: appRoot + "/aide/fr/guides-utilisateur/utiliser-les-services-de-la-geoplateforme/tutoriels/",
    helpProducerGuideCreateDatasheet: appRoot + "/aide/fr/guides-producteur/publier-des-donnees-via-cartes-gouv/deposer-donnees-sur-cartes-gouv/",
    helpUserGuideCreateKeys: appRoot + "/aide/fr/guides-utilisateur/creation-des-cles-et-integration-sig/",
    helpUserGuideCreateMap: appRoot + "/aide/fr/guides-utilisateur/creer-une-carte/",
    catalogue: catalogueUrl ?? appRoot + "/rechercher-une-donnee",
    maps: appRoot + "/explorer-les-cartes",
    my_maps: appRoot + "/mes-cartes",
    contact_us: appRoot + "/aide/fr/nous-ecrire",
    discover_cartesgouvfr: appRoot + "/decouvrir",
    present_service_maps: appRoot + "/decouvrir/explorer-les-cartes",
    present_service_catalogue: appRoot + "/decouvrir/rechercher-une-donnee",
    present_service_publish: appRoot + "/decouvrir/publier-une-donnee",
    offers: appRoot + "/offres",
    join_cartesgouvfr_community: appRoot + "/nous-rejoindre",
    news_list: appRoot + "/actualites",
    service_status: appRoot + "/aide/fr/niveau-de-service",
    personal_data: appRoot + "/donnees-personnelles",
    accessibility: appRoot + "/accessibilite",
    terms_of_service: appRoot + "/cgu",
    legal_notice: appRoot + "/mentions-legales",
    sitemap: appRoot + "/plan-du-site",
    newsletterSubscription: appRoot + "/lettre-d-information",
    community_geopf_cartesgouvfr_expertises_territoires: "https://www.expertises-territoires.fr/jcms/pl1_557493/fr/communaute-geoplateforme-et-cartes-gouv",
    roadmap: appRoot + "/evolutions",
    
} as const;

export function externalLink(route: keyof typeof externalUrls, title?: string): RegisteredLinkProps {
    return {
        href: externalUrls[route],
        rel: "noopener external",
        target: "_blank",
        title: title ? `${title} - nouvelle fenêtre` : "Nouvelle fenêtre",
    };
}