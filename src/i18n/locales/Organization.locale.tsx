import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";
import { UserRole } from "@/types/UserRole";
import { formatDateFromISO } from "@/utils";
import { ReactNode } from "react";

const { i18n } = declareComponentKeys<
    | "organizations"
    | "organization-list"
    | "organization-list__description"
    | "rights"
    | "members"
    | "select-member__label"
    | "add-member"
    | "remove-member"
    | "owner"
    | "owner__explain"
    | "member"
    | "member__explain"
    | "editor"
    | "editor__explain"
    | { K: "user-role"; P: UserRole; R: string }
    | { K: "user-role__explain"; P: UserRole; R: string }
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
    "rights": "Droits",
    "members": "Membres",
    "select-member__label": "Sélectionnez un droit pour ce membre",
    "add-member": "Ajouter un membre",
    "remove-member": "Supprimer le membre de l'espace de travail",
    "owner": "Admin",
    "owner__explain": "Gérer les membres et cartes d'un espace de travail (suppression, modification de droits...)",
    "member": "Consultation",
    "member__explain": "Consulter les cartes de l'espace de travail",
    "editor": "Édition",
    "editor__explain": "Créer des cartes dans l'espace de travail",
    "user-role": (role) => {
        switch (role) {
            case UserRole.OWNER:
            case UserRole.MEMBER:
            case UserRole.EDITOR:
                return OrganizationFrTranslations[role];
            default:
                return "";
        }
    },
    "user-role__explain": (role) => {
        switch (role) {
            case UserRole.OWNER:
            case UserRole.MEMBER:
            case UserRole.EDITOR:
                return OrganizationFrTranslations[`${role}__explain`];
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
        {name ? <> (<em>{name}</em>)</> : ""} ?
        <b> Cette action est irréversible.</b></>,
    "inactive": "Inactif",
};

export const OrganizationEnTranslations: Translations<"en">["Organization"] = {
    "organizations": undefined,
    "organization-list": undefined,
    "organization-list__description": undefined,
    "rights": undefined,
    "members": undefined,
    "select-member__label": undefined,
    "add-member": undefined,
    "remove-member": undefined,
    "owner": undefined,
    "owner__explain": undefined,
    "member": undefined,
    "member__explain": undefined,
    "editor": undefined,
    "editor__explain": undefined,
    "user-role": undefined,
    "user-role__explain": undefined,
    "no-corresponding-organization__title": undefined,
    "no-corresponding-organization__description": undefined,
    "add-organization": undefined,
    "uploaded-at": undefined,
    "delete-organization": undefined,
    "delete-organization--message": undefined,
    "inactive": undefined,
};
