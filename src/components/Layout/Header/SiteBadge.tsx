import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";

import { groups, useRoute } from "@/router/router";
import { useTranslation } from "@/i18n";

export default function SiteBadge() {
    const route = useRoute();
    const { t } = useTranslation("Layout");

    if (groups.map.has(route)) {
        return (
            <Badge className={fr.cx("fr-badge--yellow-tournesol")} noIcon={true} as="span" small={true}>
                <span className={fr.cx("fr-icon--xs", "fr-icon-brush-fill", "fr-mr-1v")} />
                {t("badge")}
            </Badge>
        );
    }

    return null;
}
