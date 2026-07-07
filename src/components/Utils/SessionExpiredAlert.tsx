import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { FC, memo } from "react";

import { groups, useRoute } from "@/router/router";
import useUserQuery from "@/hooks/queries/useUserQuery";

const SessionExpiredAlert: FC = () => {
    const sessionExpired = false;
    const { data: user } = useUserQuery();
    const route = useRoute();

    return (
        !groups.public.has(route) &&
        sessionExpired &&
        user && (
            <div className={fr.cx("fr-mb-4v")}>
                <Alert
                    severity="error"
                    title="Session expirée"
                    description={
                        <>
                            Veuillez{" "}
                            <a
                                href="./login"
                                rel="noreferrer"
                                target="_blank"
                            >
                                vous-reconnecter
                            </a>{" "}
                            dans un nouvel onglet
                        </>
                    }
                    closable={true}
                />
            </div>
        )
    );
};

export default memo(SessionExpiredAlert);
