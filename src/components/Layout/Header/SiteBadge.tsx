import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { useRoute } from "@/router/router";

export default function SiteBadge() {
    const route = useRoute();

    if (
        (route.name &&
            [
                "dashboard",
                "datastore_selection",
                "datastore_create_request",
                "datastore_create_request_confirm",
                "join_community",
                "accesses_request",
                "discover_publish",
            ].includes(route.name))
    ) {
        return (
            <Badge className={fr.cx("fr-badge--green-archipel")} noIcon={true} as="span" small={true}>
                <span className={fr.cx("fr-icon--sm", "fr-icon-database-line", "fr-mr-1v")} />
                Publier
            </Badge>
        );
    }

    return null;
}
