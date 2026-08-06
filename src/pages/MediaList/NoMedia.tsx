import { useTranslation } from "@/i18n";
import { fr } from "@codegouvfr/react-dsfr";
import { tss } from "tss-react";

export default function NoMedia() {
    const { t } = useTranslation("MediaList");
    const { classes, cx } = useStyles();

    return (
        <div className={cx(classes.root, fr.cx("fr-mt-10v"))}>
            <div className={classes.rightSection}>

                <h6 className={fr.cx("fr-mb-4v")}>{t("no-corresponding-media__title")}</h6>

                <p className={fr.cx("fr-mb-8v")}>{t("no-corresponding-media__description")}</p>
            </div>
        </div>
    );
}

const useStyles = tss.withName({ NoMedia }).create({
    root: {
        display: "flex",
        gap: fr.spacing("20v"),
    },
    rightSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
});
