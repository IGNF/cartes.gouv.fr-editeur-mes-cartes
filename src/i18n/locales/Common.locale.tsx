import { formatDateFromISO } from "@/utils";
import { declareComponentKeys } from "../i18n";
import { type Translations } from "../types";

const { i18n } = declareComponentKeys<
    | "new_window"
    | "previous_step"
    | "next_step"
    | "url_copied"
    | "copy_to_clipboard"
    | "alert_copied"
    | "alert_copy_to_clipboard"
    | "go_to_content"
    | "maps_sidemenu"
    | "refresh"
    | { K: "last_refresh_date"; P: { dataUpdatedAt: number }; R: string }
    | { K: "nb_results"; P: { displayed: number; total: number }; R: string }
    | "search"
    | "information"
    | "no_necessary_rights"
    | "yes"
    | "no"
    | "cancel"
    | "delete"
    | "duplicate"
    | "open"
    | "share"
>()("Common");
export type I18n = typeof i18n;

export const commonFrTranslations: Translations<"fr">["Common"] = {
    new_window: "ouvre une nouvelle fenêtre",
    previous_step: "Étape précédente",
    next_step: "Étape suivante",
    url_copied: "URL copiée",
    copy_to_clipboard: "Copier dans le presse-papier",
    alert_copied: "Copié",
    alert_copy_to_clipboard: "Le texte a été copié dans le presse-papier.",
    go_to_content: "Aller au contenu",
    maps_sidemenu: "Mes cartes",
    refresh: "Rafraîchir",
    last_refresh_date: ({ dataUpdatedAt }) => `Mise à jour le ${formatDateFromISO(new Date(dataUpdatedAt).toISOString())}`,
    nb_results: ({ displayed, total }) => {
        if (total === 0) return "Aucun résultat";
        if (total === 1) return "1 résultat affiché sur 1";
        return `${displayed} résultats affichés sur ${total}`;
    },
    search: "Rechercher",
    information: "Information",
    no_necessary_rights: "Vous n'avez pas les droits nécessaires pour afficher cette page.",
    yes: "Oui",
    no: "Non",
    cancel: "Annuler",
    delete: "Supprimer",
    duplicate: "Dupliquer",
    share: "Partager",
    open: "Ouvrir",
};

export const commonEnTranslations: Translations<"en">["Common"] = {
    new_window: undefined,
    previous_step: undefined,
    next_step: undefined,
    url_copied: undefined,
    copy_to_clipboard: undefined,
    alert_copied: undefined,
    alert_copy_to_clipboard: undefined,
    go_to_content: undefined,
    maps_sidemenu: undefined,
    refresh: undefined,
    last_refresh_date: undefined,
    nb_results: undefined,
    search: undefined,
    information: undefined,
    no_necessary_rights: undefined,
    yes: undefined,
    no: undefined,
    cancel: undefined,
    delete: undefined,
    duplicate: undefined,
    share: undefined,

    open: undefined,
};
