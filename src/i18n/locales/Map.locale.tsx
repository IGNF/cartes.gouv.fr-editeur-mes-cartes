import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";
import { ReactNode } from "react";

const { i18n } = declareComponentKeys<
    | "maps"
    | "map-list"
    | "map-list__description"
    | "create-map"
    | "create-map-service"
    | "view"
    | "no-corresponding-map__title"
    | "no-corresponding-map__description"
    | "delete-map"
    | "delete-map--pending"
    | "share-map"
    | "share-map__link-hint"
    | "share-map__iframe-hint"
    | "copy-map"
    | { K: "delete-map--message"; P: { fileName?: string }; R: ReactNode }
>()("Map");
export type I18n = typeof i18n;

export const MapFrTranslations: Translations<"fr">["Map"] = {
    "maps": "Cartes",
    "map-list": "Mes cartes",
    "map-list__description": "Gérer mes cartes",
    "create-map": "Créer une carte",
    "create-map-service": "Créer",
    "view": "Ouvrir",
    "no-corresponding-map__title": "Aucune carte correspondante",
    "no-corresponding-map__description": "Aucune carte ne correspond à vos filtres.",
    "delete-map": "Supprimer la carte",
    "delete-map--pending": "Carte en cours de suppression",
    "share-map": "Partager la carte",
    "share-map__link-hint": "Toute personne ayant ce lien peut visualiser votre carte sans avoir à se créer de compte.",
    "share-map__iframe-hint": "Intégrez votre carte dans un site web",
    "copy-map": "Dupliquer la carte",
    "delete-map--message": ({ fileName }) => <>Êtes-vous sûr de vouloir supprimer
        {fileName ? <> la carte <em>{fileName}</em></> : "cette carte"} ?
        <b> Cette action est irréversible.</b></>,
};

export const MapEnTranslations: Translations<"en">["Map"] = {
    "maps": undefined,
    "map-list": undefined,
    "map-list__description": undefined,
    "create-map": undefined,
    "create-map-service": undefined,
    "view": undefined,
    "no-corresponding-map__title": undefined,
    "no-corresponding-map__description": undefined,
    "delete-map": undefined,
    "delete-map--pending": undefined,
    "share-map": undefined,
    "share-map__link-hint": undefined,
    "share-map__iframe-hint": undefined,
    "copy-map": undefined,
    "delete-map--message": undefined,
};
