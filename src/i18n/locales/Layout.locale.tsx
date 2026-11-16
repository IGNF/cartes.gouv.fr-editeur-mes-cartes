import { declareComponentKeys } from "@/i18n/i18n";
import { Translations } from "@/i18n/types";

const { i18n } = declareComponentKeys<
    | "account-btn"
    | "account"
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
>()("Layout");
export type I18n = typeof i18n;

export const LayoutFrTranslations: Translations<"fr">["Layout"] = {
    "account-btn": "Mon espace",
    account: "Mon compte",
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
};

export const LayoutEnTranslations: Translations<"en">["Layout"] = {
    "account-btn": undefined,
    account: undefined,
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
};
