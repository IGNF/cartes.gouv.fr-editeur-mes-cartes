import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";

const { i18n } = declareComponentKeys<
    | { K: "title"; P: { mapName?: string }; R: string | undefined }
    | "map_list"
    | "create_map"
    | "filter_label"
    | "filter_placeholder"
    | "sort_label"
    | "sort_placeholder"
    | "view"
>()("MapList");
export type I18n = typeof i18n;

export const DatasheetListFrTranslations: Translations<"fr">["MapList"] = {
    title: ({ mapName }) => mapName,
    map_list: "Mes cartes",
    create_map: "Créer une carte",
    filter_label: "Filtrer par",
    filter_placeholder: "Filtrer par",
    sort_label: "Trier par",
    sort_placeholder: "Trier par",
    view: "Ouvrir",
};

export const DatasheetListEnTranslations: Translations<"en">["MapList"] = {
    title: undefined,
    map_list: undefined,
    create_map: undefined,
    filter_label: undefined,
    filter_placeholder: undefined,
    sort_label: undefined,
    sort_placeholder: undefined,
    view: undefined,
};
