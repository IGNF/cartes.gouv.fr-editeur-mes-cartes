import Card from "@codegouvfr/react-dsfr/Card";
import { FC, ReactNode } from "react";

import { Media } from "@/api/model";
import { tss } from "tss-react";
import { fr } from "@codegouvfr/react-dsfr";
import Tag from "@codegouvfr/react-dsfr/Tag";
import { useTranslation } from "@/i18n";
import { niceBytes } from "@/utils";
type MediaItemProps = {
    media: Media,
    footer: ReactNode
};

const MediaItem: FC<MediaItemProps> = ({ media, footer }) => {
    const { classes, cx } = useStyles();
    const { t } = useTranslation("MediaList");


    return (
        <>
            <Card
                imageComponent={<img className={fr.cx("fr-ratio-1x1")} alt="Illustration" src={media.thumb_url} />}
                horizontal={true}
                title={media.name}
                footer={footer}
                size="small"
                start={media.size || media.uploaded_at ?
                    <ul className="fr-tags-group">
                        {media.size && <li><Tag>{niceBytes(media.size)}</Tag></li>}
                        {media.uploaded_at && <li><Tag>{t("uploaded-at", {dataUploadedAt: media.uploaded_at})}</Tag></li>}
                    </ul>
                    : ""}
                className={cx(classes.cardMedia)}
            />
        </>
    );
};

const useStyles = tss.withName({ MediaItem }).create({
    // Permet d'avoir une image non disproportionné et bien centré
    cardMedia: {
        "&  .fr-card__img": {
            display: "flex",
            justifyContent: "center",
            "& img": {
                maxWidth: "fit-content",
                maxHeight: "fit-content"
            }
        }
    }
});

export default MediaItem;