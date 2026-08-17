import { Tag } from "@codegouvfr/react-dsfr/Tag";
import Card from "@codegouvfr/react-dsfr/Card";
import { FC, ReactNode } from "react";
import { symToStr } from "tsafe/symToStr";

import { useImage } from "@/hooks/useImage";
import { MapList } from "@/api/model";
type MapItemProps = {
    map: MapList,
    footer: ReactNode
};

const MapItem: FC<MapItemProps> = ({ map, footer }) => {
    // En réalité, correspond à une image
    const imageUrl = useImage(map.img_url);


    // const isOpen = useIsModalOpen(confirmDeleteMapModal);

    return (
        <>
            <Card
                imageUrl={imageUrl}
                imageAlt={"illustration"}
                horizontal={true}
                title={map.title}
                // desc={map.description} // Pour l'instant on n'en mets pas car dur de faire le textwrap
                start={
                    map.theme !== null &&
                    <Tag as="span" >
                        {map.theme}
                    </Tag >
                }
                footer={footer}
                size="small"
            />
        </>
    );
};

MapItem.displayName = symToStr({ MapItem });
export default MapItem;
