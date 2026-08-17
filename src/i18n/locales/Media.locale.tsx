import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";
import { formatDateFromISO } from "@/utils";
import { ReactNode } from "react";

const { i18n } = declareComponentKeys<
    | "medias"
    | "media-list"
    | "media-list__description"
    | "no-corresponding-media__title"
    | "no-corresponding-media__description"
    | "add-media"
    | { K: "uploaded-at"; P: { dataUploadedAt: string }; R: string }
    | "delete-media"
    | { K: "delete-media--message"; P: { fileName?: string }; R: ReactNode }
>()("Media");
export type I18n = typeof i18n;

export const MediaFrTranslations: Translations<"fr">["Media"] = {
    "medias": "Images",
    "media-list": "Mes images",
    "media-list__description": "Gérer mes images",
    "no-corresponding-media__title": "Aucune image correspondante",
    "no-corresponding-media__description": "Aucune image ne correspond à vos filtres.",
    "add-media": "Ajouter une image",
    "uploaded-at": ({ dataUploadedAt }) => `${formatDateFromISO(new Date(dataUploadedAt).toISOString())}`,
    "delete-media": "Supprimer l'image",
    "delete-media--message": ({ fileName }) => <>Êtes-vous sûr de vouloir supprimer cette image
        {fileName ? <> (<em>{ fileName }</em>)</> : ""} ?
        <b> Cette action est irréversible.</b></>,
};

export const MediaEnTranslations: Translations<"en">["Media"] = {
    "medias": undefined,
    "media-list": undefined,
    "media-list__description": undefined,
    "no-corresponding-media__title": undefined,
    "no-corresponding-media__description": undefined,
    "add-media": undefined,
    "uploaded-at": undefined,
    "delete-media": undefined,
    "delete-media--message": undefined,
};
