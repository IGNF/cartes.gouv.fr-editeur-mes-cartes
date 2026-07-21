import { formatDateFromISO } from "@/utils";
import { declareComponentKeys } from "../i18n";
import { type Translations } from "../types";

const { i18n } = declareComponentKeys<
    | "warning"
    | "error"
    | "add"
    | "adding"
    | "modify"
    | "apply"
    | "record"
    | "modifying"
    | "removing"
    | "loading"
    | "continue"
    | "validate"
    | "submit"
    | "save"
    | "copy"
    | "send"
    | "cancel"
    | "delete"
    | "consult"
    | "see"
    | "yes"
    | "no"
    | "accept"
    | "reject"
    | "publish"
    | "unpublish"
    | "published"
    | "not_published"
    | "information"
    | "no_necessary_rights"
    | "mandatory_fields"
    | "none"
    | "new_window"
    | "previous_step"
    | "next_step"
    | "url_copied"
    | "copy_to_clipboard"
    | "alert_copied"
    | "alert_copy_to_clipboard"
    | "go_to_content"
    | "download"
    | "trimmed_error"
    | "search"
    | "clear"
    | "refresh"
    | "filter"
    | "remove_filters"
    | "select_option"
    | "maps_sidemenu"
    | "duplicate"
    | "share"
    | "open"
    | "link"
    | "iframe"
    | { K: "last_refresh_date"; P: { dataUpdatedAt: number }; R: string }
    | { K: "nb_results"; P: { displayed: number; total: number }; R: string }
>()("Common");
export type I18n = typeof i18n;

export const commonFrTranslations: Translations<"fr">["Common"] = {
    warning: "Avertissement",
    error: "Une erreur est survenue",
    add: "Ajouter",
    adding: "Ajout en cours ...",
    modify: "Modifier",
    apply: "Appliquer",
    record: "Enregistrer",
    modifying: "Modification en cours ...",
    removing: "Suppression en cours ...",
    loading: "Chargement ...",
    continue: "Continuer",
    validate: "Valider",
    submit: "Soumettre",
    save: "Sauvegarder",
    copy: "Copier",
    send: "Envoyer",
    cancel: "Annuler",
    delete: "Supprimer",
    consult: "Consulter",
    see: "Voir",
    yes: "Oui",
    no: "Non",
    accept: "Accepter",
    reject: "Refuser",
    publish: "Publier",
    unpublish: "Dépublier",
    published: "Publié",
    not_published: "Non publié",
    information: "Information",
    no_necessary_rights: "Vous n'avez pas les droits nécessaires pour afficher cette page.",
    mandatory_fields: "Sauf mention contraire “(optionnel)” dans le label, tous les champs sont obligatoires.",
    none: "Aucune",
    new_window: "ouvre une nouvelle fenêtre",
    previous_step: "Étape précédente",
    next_step: "Étape suivante",
    url_copied: "URL copiée",
    copy_to_clipboard: "Copier dans le presse-papier",
    alert_copied: "Copié",
    alert_copy_to_clipboard: "Le texte a été copié dans le presse-papier.",
    go_to_content: "Aller au contenu",
    download: "Télécharger",
    trimmed_error: "La chaîne de caractères ne doit contenir aucun espace en début et fin",
    search: "Rechercher",
    clear: "Effacer",
    refresh: "Rafraîchir",
    filter: "Filtrer",
    remove_filters: "Retirer les filtres",
    select_option: "Sélectionnez une option",
    maps_sidemenu: "Mes cartes",
    duplicate: "Dupliquer",
    share: "Partager",
    open: "Ouvrir",
    link: "Lien",
    iframe: "iframe",
    last_refresh_date: ({ dataUpdatedAt }) => `Mise à jour le ${formatDateFromISO(new Date(dataUpdatedAt).toISOString())}`,
    nb_results: ({ displayed, total }) => {
        if (total === 0) return "Aucun résultat";
        if (total === 1) return "1 résultat affiché sur 1";
        return `${displayed} résultats affichés sur ${total}`;
    },
};

export const commonEnTranslations: Translations<"en">["Common"] = {
    warning: undefined,
    error: undefined,
    add: undefined,
    adding: undefined,
    modify: undefined,
    apply: undefined,
    record: undefined,
    modifying: undefined,
    removing: undefined,
    loading: undefined,
    continue: undefined,
    validate: undefined,
    submit: undefined,
    save: undefined,
    copy: undefined,
    send: undefined,
    cancel: undefined,
    delete: undefined,
    consult: undefined,
    see: undefined,
    yes: undefined,
    no: undefined,
    accept: undefined,
    reject: undefined,
    publish: undefined,
    unpublish: undefined,
    published: undefined,
    not_published: undefined,
    information: undefined,
    no_necessary_rights: undefined,
    mandatory_fields: undefined,
    none: undefined,
    new_window: undefined,
    previous_step: undefined,
    next_step: undefined,
    url_copied: undefined,
    copy_to_clipboard: undefined,
    alert_copied: undefined,
    alert_copy_to_clipboard: undefined,
    go_to_content: undefined,
    download: undefined,
    trimmed_error: undefined,
    search: undefined,
    clear: undefined,
    refresh: undefined,
    filter: undefined,
    remove_filters: undefined,
    select_option: undefined,
    maps_sidemenu: undefined,
    duplicate: undefined,
    share: undefined,
    open: undefined,
    link: undefined,
    iframe: undefined,
    last_refresh_date: undefined,
    nb_results: undefined,
};
