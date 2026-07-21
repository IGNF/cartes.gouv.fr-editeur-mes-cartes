import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";
import { ReactNode } from "react";

const { i18n } = declareComponentKeys<
    | "map_list"
    | "create_map"
    | "filter_label"
    | "filter_placeholder"
    | "sort_label"
    | "sort_placeholder"
    | "view"
    | "no_map_corresponding__title"
    | "no_map_corresponding__description"
    | "delete_map"
    | "share_map"
    | "copy_map"
    | "delete_map--pending"
    | { K: "delete_map--message"; P: { fileName?: string }; R: ReactNode }
>()("MapList");
export type I18n = typeof i18n;

export const DatasheetListFrTranslations: Translations<"fr">["MapList"] = {
    map_list: "Mes cartes",
    create_map: "Créer une carte",
    filter_label: "Filtrer par",
    filter_placeholder: "Filtrer par",
    sort_label: "Trier par",
    sort_placeholder: "Trier par",
    view: "Ouvrir",
    no_map_corresponding__title: "Aucune carte correspondante",
    no_map_corresponding__description: "Aucune carte ne correspond à vos filtres.",
    delete_map: "Supprimer la carte",
    share_map: "Partager la carte",
    copy_map: "Dupliquer la carte",
    "delete_map--message": ({ fileName }) => <>Êtes-vous sûr de vouloir supprimer
        {fileName ? <> la carte <em>{fileName}</em></> : "cette carte"} ?
        <b> Cette action est irréversible.</b></>,
    "delete_map--pending": "Carte en cours de suppression"
};

export const DatasheetListEnTranslations: Translations<"en">["MapList"] = {
    map_list: undefined,
    create_map: undefined,
    filter_label: undefined,
    filter_placeholder: undefined,
    sort_label: undefined,
    sort_placeholder: undefined,
    view: undefined,
    no_map_corresponding__title: undefined,
    no_map_corresponding__description: undefined,
    delete_map: undefined,
    share_map: undefined,
    copy_map: undefined,
    "delete_map--pending": undefined,
    "delete_map--message": undefined,
};
