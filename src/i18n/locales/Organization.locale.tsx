import { declareComponentKeys } from "@/i18n/i18n";

import { Translations } from "@/i18n/types";
import { Share } from "@/types/Share";
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
    | { K: "remove-member__message"; P: { name?: string; organization?: string }; R: ReactNode }
    | "user-role__label"
    | "owner"
    | "owner__explain"
    | "member"
    | "member__explain"
    | "editor"
    | "editor__explain"
    | { K: "user-role"; P: UserRole; R: string }
    | { K: "user-role__explain"; P: UserRole; R: string }
    | "share__label"
    | "atlas"
    | "atlas__explain"
    | "public"
    | { K: "public__explain"; R: ReactNode }
    | "private"
    | "private__explain"
    | { K: "share"; P: Share; R: string }
    | { K: "share__explain"; P: Share; R: ReactNode }
    | "no-corresponding-organization__title"
    | "no-corresponding-organization__description"
    | "add-organization"
    | { K: "uploaded-at"; P: { dataUploadedAt: string }; R: string }
    | "delete-organization"
    | { K: "delete-organization__message"; P: { name?: string }; R: ReactNode }
    | "inactive"
    | "info"
    | "leave-organization"
    | { K: "leave-organization__message"; P: { organizationName?: string }; R: ReactNode }
    | "organization-name"
    | "organization-description"
    | "organization-description__hint"
    | "organization-image"
    | "organization-image__hint"
    | "organization-image__alt"
    | "organization-limit-access"
    | "organization-limit-access__hint"
    | { K: "organization-limit-access__value"; P: string; R: ReactNode }
    | "no-registered-domain"
>()("Organization");
export type I18n = typeof i18n;

export const OrganizationFrTranslations: Translations<"fr">["Organization"] = {
    organizations: "Espaces de travail",
    "organization-list": "Mes espaces de travail",
    "organization-list__description": "Gérer mes espaces de travail",
    rights: "Droits",
    members: "Membres",
    "select-member__label": "Sélectionnez un droit pour ce membre",
    "add-member": "Ajouter un membre",
    "remove-member": "Supprimer le membre de l'espace de travail",
    "remove-member__message": ({ name, organization }) => (
        <>
            Êtes-vous sûr de vouloir supprimer {name ? <b>{name}</b> : "ce membre"} de cet espace de travail{" "}
            {organization ? (
                <>
                    {" "}
                    (<em>{organization}</em>)
                </>
            ) : (
                ""
            )}{" "}
            ?<b> Cette action est irréversible.</b>
        </>
    ),
    "user-role__label": "Droits",
    owner: "Admin",
    owner__explain: "Gérer les membres et cartes d'un espace de travail (suppression, modification de droits...)",
    member: "Consultation",
    member__explain: "Consulter les cartes de l'espace de travail",
    editor: "Édition",
    editor__explain: "Créer des cartes dans l'espace de travail",
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
    share__label: "Visibilité",
    atlas: "Publique",
    atlas__explain: "Visible par tous, sans restriction",
    public: "Équipe",
    public__explain: (
        <>
            Visible par tous les membres de l'espace, éditable avec des droits <b>Admin</b> ou d'<b>Édition</b>
        </>
    ),
    private: "Restreint",
    private__explain: "Visible et éditable uniquement par le créateur de la carte et les admin de l'espace de travail",
    share: (share) => {
        switch (share) {
            case Share.RESTRICTED:
            case Share.TEAM:
            case Share.PUBLIC:
                return OrganizationFrTranslations[share];
            default:
                return "";
        }
    },
    share__explain: (share) => {
        switch (share) {
            case Share.RESTRICTED:
            case Share.TEAM:
            case Share.PUBLIC:
                return OrganizationFrTranslations[`${share}__explain`];
            default:
                return "";
        }
    },
    "no-corresponding-organization__title": "Aucun espace de travail correspondant",
    "no-corresponding-organization__description": "Aucun espace de travail ne correspond à vos filtres.",
    "add-organization": "Ajouter un espace de travail",
    "uploaded-at": ({ dataUploadedAt }) => `${formatDateFromISO(new Date(dataUploadedAt).toISOString())}`,
    "delete-organization": "Supprimer l'espace de travail",
    "delete-organization__message": ({ name }) => (
        <>
            Êtes-vous sûr de vouloir supprimer l'espace de travail
            {name ? (
                <>
                    {" "}
                    <em>{name}</em>
                </>
            ) : (
                ""
            )}{" "}
            ? Toutes les cartes relatives à cet espace seront définitivement perdus.<b> Cette action est irréversible.</b>
        </>
    ),
    inactive: "Inactif",
    info: "Informations",
    "leave-organization": "Quitter l'espace de travail",
    "leave-organization__message": ({ organizationName }) => (
        <>
            Êtes-vous sûr de vouloir quitter l'espace de travail
            {organizationName ? (
                <>
                    {" "}
                    <em>{organizationName}</em>
                </>
            ) : (
                ""
            )}{" "}
            ?<b> Cette action est irréversible.</b>
        </>
    ),
    "organization-name": "Nom",
    "organization-description": "Description",
    "organization-description__hint": "Ajouter quelques mots pour présenter votre espace de travail.",
    "organization-image": "Image",
    "organization-image__hint": "Ajouter un logo ou une image pour votre espace de travail.",
    "organization-image__alt": "Image de l'espace de travail.",
    "organization-limit-access": "Limiter l’accès",
    "organization-limit-access__hint":
        "Ajoutez un nom de domaine pour restreindre l'accès à votre espace de travail. Ceux qui n'ont pas le bon domaine ne pourront ni consulter ni modifier vos cartes, même avec un lien d'invitation.",
    "organization-limit-access__value": (pattern) => (pattern.endsWith("$") ? `Le mail finit par : ${pattern.slice(0, -1)}` : `Le mail contient : ${pattern}`),
    "no-registered-domain": "Aucun nom de domaine renseigné",
};

export const OrganizationEnTranslations: Translations<"en">["Organization"] = {
    organizations: undefined,
    "organization-list": undefined,
    "organization-list__description": undefined,
    rights: undefined,
    members: undefined,
    "select-member__label": undefined,
    "add-member": undefined,
    "remove-member": undefined,
    "remove-member__message": undefined,
    "user-role__label": undefined,
    owner: undefined,
    owner__explain: undefined,
    member: undefined,
    member__explain: undefined,
    editor: undefined,
    editor__explain: undefined,
    "user-role": undefined,
    "user-role__explain": undefined,
    share__label: undefined,
    atlas: undefined,
    atlas__explain: undefined,
    public: undefined,
    public__explain: undefined,
    private: undefined,
    private__explain: undefined,
    share: undefined,
    share__explain: undefined,
    "no-corresponding-organization__title": undefined,
    "no-corresponding-organization__description": undefined,
    "add-organization": undefined,
    "uploaded-at": undefined,
    "delete-organization": undefined,
    "delete-organization__message": undefined,
    inactive: undefined,
    info: undefined,
    "leave-organization": undefined,
    "leave-organization__message": undefined,
    "organization-name": undefined,
    "organization-description": undefined,
    "organization-description__hint": undefined,
    "organization-image": undefined,
    "organization-image__hint": undefined,
    "organization-image__alt": undefined,
    "organization-limit-access": undefined,
    "organization-limit-access__hint": undefined,
    "organization-limit-access__value": undefined,
    "no-registered-domain": undefined,
};
