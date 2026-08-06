import { declareComponentKeys } from "@/i18n/i18n";
import { Translations } from "@/i18n/types";

const { i18n } = declareComponentKeys<
    | "account-btn"
    | "account"
    | "board"
    | "disconnect"
>()("Layout");
export type I18n = typeof i18n;

export const LayoutFrTranslations: Translations<"fr">["Layout"] = {
    "account-btn": "Mon espace",
    "account": "Mon compte",
    "board": "Tableau de bord",
    "disconnect": "Se déconnecter",
};

export const LayoutEnTranslations: Translations<"en">["Layout"] = {
    "account-btn": undefined,
    "account": undefined,
    "board": undefined,
    "disconnect": undefined,
};
