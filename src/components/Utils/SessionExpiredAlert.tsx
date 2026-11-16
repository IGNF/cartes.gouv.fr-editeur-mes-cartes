import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { FC, memo } from "react";

import { groups, useRoute } from "@/router/router";
import { useOidc } from "@/oidc";
import { useTranslation } from "@/i18n";

const SessionExpiredAlert: FC = () => {
    const { t } = useTranslation("Layout");
    const sessionExpired = false;
    const { isUserLoggedIn } = useOidc();
    const route = useRoute();

    return (
        !groups.public.has(route) &&
        sessionExpired &&
        isUserLoggedIn && (
            <div className={fr.cx("fr-mb-4v")}>
                <Alert severity="error" title={t("session-expired")} description={t("session-expired-description") ?? undefined} closable={true} />
            </div>
        )
    );
};

export default memo(SessionExpiredAlert);
