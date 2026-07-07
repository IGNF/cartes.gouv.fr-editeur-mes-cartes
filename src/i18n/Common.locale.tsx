import { declareComponentKeys } from "./i18n";
import { type Translations } from "./types";

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
};

export const commonEnTranslations: Translations<"en">["Common"] = {
    new_window: "Open in a new window",
    previous_step: "Previous step",
    next_step: "Next step",
    url_copied: "URL copied",
    copy_to_clipboard: "Copy to clipboard",
    alert_copied: "Copied",
    alert_copy_to_clipboard: "Text has been copied to clipboard.",
    go_to_content: "Go to content",
    maps_sidemenu: "My maps",
};
