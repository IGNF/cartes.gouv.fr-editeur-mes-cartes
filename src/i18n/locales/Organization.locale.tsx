import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";
import { UserRole } from "@/types/UserRole";
import { formatDateFromISO } from "@/utils";
import { ReactNode } from "react";

const { i18n } = declareComponentKeys<
    | "organizations"
    | "organization-list"
    | "organization-list__description"
    | { K: "user-role"; P: UserRole; R: string }
    | "no-corresponding-organization__title"
    | "no-corresponding-organization__description"
    | "add-organization"
    | { K: "uploaded-at"; P: { dataUploadedAt: string }; R: string }
    | "delete-organization"
    | { K: "delete-organization--message"; P: { name?: string }; R: ReactNode }
    | "inactive"
>()("Organization");
export type I18n = typeof i18n;

export const OrganizationFrTranslations: Translations<"fr">["Organization"] = {
    "organizations": "Espaces de travail",
    "organization-list": "Mes espaces de travail",
    "organization-list__description": "Gérer mes espaces de travail",
    "user-role": (role) => {
        switch (role) {
            case UserRole.OWNER:
                return "Admin";
            case UserRole.MEMBER:
                return "Consultation";
            case UserRole.EDITOR:
                return "Édition";
            default:
                return "";
        }
    },
    "no-corresponding-organization__title": "Aucun espace de travail correspondant",
    "no-corresponding-organization__description": "Aucun espace de travail ne correspond à vos filtres.",
    "add-organization": "Ajouter un espace de travail",
    "uploaded-at": ({ dataUploadedAt }) => `${formatDateFromISO(new Date(dataUploadedAt).toISOString())}`,
    "delete-organization": "Supprimer l'espace de travail",
    "delete-organization--message": ({ name }) => <>Êtes-vous sûr de vouloir supprimer cet espace
        {name ? <> (<em>{ name }</em>)</> : ""} ?
        <b> Cette action est irréversible.</b></>,
    "inactive": "Inactif",
};

export const OrganizationEnTranslations: Translations<"en">["Organization"] = {
    "organizations": undefined,
    "organization-list": undefined,
    "organization-list__description": undefined,
    "user-role": undefined,
    "no-corresponding-organization__title": undefined,
    "no-corresponding-organization__description": undefined,
    "add-organization": undefined,
    "uploaded-at": undefined,
    "delete-organization": undefined,
    "delete-organization--message": undefined,
    "inactive": undefined,
};
