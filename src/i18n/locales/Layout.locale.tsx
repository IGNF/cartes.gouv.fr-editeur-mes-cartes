import { declareComponentKeys } from "@/i18n/i18n";
import { Translations } from "@/i18n/types";
import { ReactNode } from "react";

const { i18n } = declareComponentKeys<
    | "account-btn"
    | "account"
    | "badge"
    | "board"
    | "disconnect"
    | "my-maps"
    | "manage-my-maps"
    | "beta-service"
    | "maps-description"
    | "maps-step-1"
    | "maps-step-2"
    | "maps-step-3"
    | "maps-step-4"
    | "learn-more"
    | "give-feedback"
    | "help"
    | "faq"
    | "user-guide"
    | "service-status"
    | "contact-us"
    | "services"
    | "explore-maps"
    | "search-data"
    | "publish-data"
    | "create-map"
    | "extract-data"
    | "contribute-data"
    | "beta"
    | "discover-cartesgouvfr"
    | "discover-cartesgouvfr-title"
    | "disconnect-me"
    | "footer-description"
    | "terms-of-service"
    | "personal-data"
    | "home-title"
    | "partner-ign"
    | "partner-transformation-ministry"
    | "partner-ecology-ministry"
    | "partner-cnig"
    | { K: "brand-top"; R: ReactNode }
    | "service-title"
    | "service-tagline"
    | "error-occurred"
    | "back-to-home"
    | "session-expired"
    | { K: "session-expired-description"; R: ReactNode }
>()("Layout");
export type I18n = typeof i18n;

export const LayoutFrTranslations: Translations<"fr">["Layout"] = {
    "account-btn": "Mon espace",
    account: "Mon compte",
    badge: "Créer",
    board: "Tableau de bord",
    disconnect: "Se déconnecter",
    "my-maps": "Mes cartes",
    "manage-my-maps": "Gérer mes cartes",
    "beta-service": "SERVICE BETA",
    "maps-description": "Créez et partagez des cartes interactives, librement et gratuitement.",
    "maps-step-1": "1. Utilisez les données de cartes.gouv.fr, ou importez vos propres données.",
    "maps-step-2": "2. Personnalisez le style de vos données.",
    "maps-step-3": "3. Ajouter une mise en forme à votre carte et partagez-là autour de vous.",
    "maps-step-4": "4. Retrouvez toutes vos cartes depuis votre tableau de bord.",
    "learn-more": "En savoir plus",
    "give-feedback": "Je donne mon avis",
    help: "Aide",
    faq: "Questions fréquentes",
    "user-guide": "Guide d’utilisation",
    "service-status": "Niveau de service",
    "contact-us": "Nous contacter",
    services: "Services",
    "explore-maps": "Explorer les cartes",
    "search-data": "Rechercher une donnée",
    "publish-data": "Publier une donnée",
    "create-map": "Créer une carte",
    "extract-data": "Extraire une donnée",
    "contribute-data": "Contribuer aux données",
    beta: "BETA",
    "discover-cartesgouvfr": "Découvrir cartes.gouv.fr",
    "discover-cartesgouvfr-title": "Découvrir cartes.gouv",
    "disconnect-me": "Me déconnecter",
    "footer-description":
        "Cartes.gouv.fr est le service public des cartes et données du territoire français. Porté par l’IGN et ses partenaires, il offre à tous un accès à la référence de la cartographie publique et permet à chacun de créer, d’héberger et de publier ses propres données et représentations.",
    "terms-of-service": "Conditions générales d’utilisation",
    "personal-data": "Données personelles",
    "home-title": "cartes.gouv.fr | Créer une carte",
    "partner-ign": "IGN",
    "partner-transformation-ministry": "MINISTÈRE DE LA TRANSFORMATION ET DE LA FONCTION PUBLIQUES",
    "partner-ecology-ministry": "MINISTÈRE DE LA TRANSITION ÉCOLOGIQUE ET DE LA COHÉSION DES TERRITOIRES",
    "partner-cnig": "Conseil National de l’Information Géolocalisée",
    "brand-top": (
        <>
            République
            <br />
            Française
        </>
    ),
    "service-title": "cartes.gouv.fr",
    "service-tagline": "Notre territoire commun",
    "error-occurred": "Une erreur est survenue",
    "back-to-home": "Retour à l'accueil",
    "session-expired": "Session expirée",
    "session-expired-description": (
        <>
            Veuillez{" "}
            <a href="./login" rel="noreferrer" target="_blank">
                vous-reconnecter
            </a>{" "}
            dans un nouvel onglet
        </>
    ),
};

export const LayoutEnTranslations: Translations<"en">["Layout"] = {
    "account-btn": undefined,
    account: undefined,
    badge: undefined,
    board: undefined,
    disconnect: undefined,
    "my-maps": undefined,
    "manage-my-maps": undefined,
    "beta-service": undefined,
    "maps-description": undefined,
    "maps-step-1": undefined,
    "maps-step-2": undefined,
    "maps-step-3": undefined,
    "maps-step-4": undefined,
    "learn-more": undefined,
    "give-feedback": undefined,
    help: undefined,
    faq: undefined,
    "user-guide": undefined,
    "service-status": undefined,
    "contact-us": undefined,
    services: undefined,
    "explore-maps": undefined,
    "search-data": undefined,
    "publish-data": undefined,
    "create-map": undefined,
    "extract-data": undefined,
    "contribute-data": undefined,
    beta: undefined,
    "discover-cartesgouvfr": undefined,
    "discover-cartesgouvfr-title": undefined,
    "disconnect-me": undefined,
    "footer-description": undefined,
    "terms-of-service": undefined,
    "personal-data": undefined,
    "home-title": undefined,
    "partner-ign": undefined,
    "partner-transformation-ministry": undefined,
    "partner-ecology-ministry": undefined,
    "partner-cnig": undefined,
    "brand-top": undefined,
    "service-title": undefined,
    "service-tagline": undefined,
    "error-occurred": undefined,
    "back-to-home": undefined,
    "session-expired": undefined,
    "session-expired-description": undefined,
};
