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
    | "filter-label"
    | "filter-placeholder"
    | "sort-label"
    | "sort-placeholder"
    | "accept"
    | "reject"
    | "publish"
    | "unpublish"
    | "published"
    | "not-published"
    | "information"
    | "no-necessary-rights"
    | "mandatory-fields"
    | "none"
    | "new-window"
    | "previous-step"
    | "next-step"
    | "url-copied"
    | "copy-to-clipboard"
    | "alert-copied"
    | "alert-copy-to-clipboard"
    | "go-to-content"
    | "download"
    | "trimmed-error"
    | "search"
    | "clear"
    | "refresh"
    | "filter"
    | "remove-filters"
    | "select-option"
    | "duplicate"
    | "share"
    | "open"
    | "link"
    | "iframe"
    | "tab-nav"
    | "email"
    | "username"
    | { K: "last-refresh-date"; P: { dataUpdatedAt: number }; R: string }
    | { K: "nb-results"; P: { displayed: number; total: number }; R: string }
    | { K: "welcome"; P: { username: string }; R: string }
>()("Common");
export type I18n = typeof i18n;

export const commonFrTranslations: Translations<"fr">["Common"] = {
    "warning": "Avertissement",
    "error": "Une erreur est survenue",
    "add": "Ajouter",
    "adding": "Ajout en cours ...",
    "modify": "Modifier",
    "apply": "Appliquer",
    "record": "Enregistrer",
    "modifying": "Modification en cours ...",
    "removing": "Suppression en cours ...",
    "loading": "Chargement ...",
    "continue": "Continuer",
    "validate": "Valider",
    "submit": "Soumettre",
    "save": "Sauvegarder",
    "copy": "Copier",
    "send": "Envoyer",
    "cancel": "Annuler",
    "delete": "Supprimer",
    "consult": "Consulter",
    "see": "Voir",
    "yes": "Oui",
    "no": "Non",
    "filter-label": "Filtrer par",
    "filter-placeholder": "Filtrer par",
    "sort-label": "Trier par",
    "sort-placeholder": "Trier par",
    "accept": "Accepter",
    "reject": "Refuser",
    "publish": "Publier",
    "unpublish": "Dépublier",
    "published": "Publié",
    "not-published": "Non publié",
    "information": "Information",
    "no-necessary-rights": "Vous n'avez pas les droits nécessaires pour afficher cette page.",
    "mandatory-fields": "Sauf mention contraire “(optionnel)” dans le label, tous les champs sont obligatoires.",
    "none": "Aucune",
    "new-window": "ouvre une nouvelle fenêtre",
    "previous-step": "Étape précédente",
    "next-step": "Étape suivante",
    "url-copied": "URL copiée",
    "copy-to-clipboard": "Copier dans le presse-papier",
    "alert-copied": "Copié",
    "alert-copy-to-clipboard": "Le texte a été copié dans le presse-papier.",
    "go-to-content": "Aller au contenu",
    "download": "Télécharger",
    "trimmed-error": "La chaîne de caractères ne doit contenir aucun espace en début et fin",
    "search": "Rechercher",
    "clear": "Effacer",
    "refresh": "Rafraîchir",
    "filter": "Filtrer",
    "remove-filters": "Retirer les filtres",
    "select-option": "Sélectionnez une option",
    "duplicate": "Dupliquer",
    "share": "Partager",
    "open": "Ouvrir",
    "link": "Lien",
    "iframe": "iframe",
    "tab-nav": "Navigation tertiaire",
    "email": "Email",
    "username": "Nom d'utilisateur",
    "last-refresh-date": ({ dataUpdatedAt }) => `Mise à jour le ${formatDateFromISO(new Date(dataUpdatedAt).toISOString())}`,
    "nb-results": ({ displayed, total }) => {
        if (total === 0) return "Aucun résultat";
        if (total === 1) return "1 résultat affiché sur 1";
        return `${displayed} résultats affichés sur ${total}`;
    },
    "welcome": ({username}) => `Bienvenue ${username}`,
};

export const commonEnTranslations: Translations<"en">["Common"] = {
    "warning": undefined,
    "error": undefined,
    "add": undefined,
    "adding": undefined,
    "modify": undefined,
    "apply": undefined,
    "record": undefined,
    "modifying": undefined,
    "removing": undefined,
    "loading": undefined,
    "continue": undefined,
    "validate": undefined,
    "submit": undefined,
    "save": undefined,
    "copy": undefined,
    "send": undefined,
    "cancel": undefined,
    "delete": undefined,
    "consult": undefined,
    "see": undefined,
    "yes": undefined,
    "no": undefined,
    "filter-label": undefined,
    "filter-placeholder": undefined,
    "sort-label": undefined,
    "sort-placeholder": undefined,
    "accept": undefined,
    "reject": undefined,
    "publish": undefined,
    "unpublish": undefined,
    "published": undefined,
    "not-published": undefined,
    "information": undefined,
    "no-necessary-rights": undefined,
    "mandatory-fields": undefined,
    "none": undefined,
    "new-window": undefined,
    "previous-step": undefined,
    "next-step": undefined,
    "url-copied": undefined,
    "copy-to-clipboard": undefined,
    "alert-copied": undefined,
    "alert-copy-to-clipboard": undefined,
    "go-to-content": undefined,
    "download": undefined,
    "trimmed-error": undefined,
    "search": undefined,
    "clear": undefined,
    "refresh": undefined,
    "filter": undefined,
    "remove-filters": undefined,
    "select-option": undefined,
    "duplicate": undefined,
    "share": undefined,
    "open": undefined,
    "link": undefined,
    "iframe": undefined,
    "tab-nav": undefined,
    "email": undefined,
    "username": undefined,
    "last-refresh-date": undefined,
    "nb-results": undefined,
    "welcome": undefined,
};
