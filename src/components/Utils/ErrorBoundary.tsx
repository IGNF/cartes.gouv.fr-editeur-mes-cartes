import { fr } from "@codegouvfr/react-dsfr";
import { Alert } from "@codegouvfr/react-dsfr/Alert";
import Button from "@codegouvfr/react-dsfr/Button";
import { FC, PropsWithChildren } from "react";
import { ErrorBoundary as BaseErrorBoundary, type FallbackProps, getErrorMessage } from "react-error-boundary";

import { externalUrls } from "@/router/externalUrls";
import { useTranslation } from "@/i18n";
import AppLayout from "../Layout/AppLayout";
import Main from "../Layout/Main";

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
    const { t } = useTranslation("Layout");

    return (
        <AppLayout>
            <Main title={t("error-occurred")}>
                <Alert severity="error" title={t("error-occurred")} description={getErrorMessage(error) ?? undefined} className={fr.cx("fr-my-3w")} />
                <Button
                    onClick={() => {
                        resetErrorBoundary();
                        window.location.assign(externalUrls.map_list);
                    }}
                >
                    {t("back-to-home")}
                </Button>
            </Main>
        </AppLayout>
    );
}

const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
    return (
        <BaseErrorBoundary
            FallbackComponent={Fallback}
            onReset={(details) => {
                // Reset the state of your app so the error doesn't happen again
                console.error(details);
            }}
        >
            {children}
        </BaseErrorBoundary>
    );
};

export default ErrorBoundary;
