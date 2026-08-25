import { ReactNode, useId, useState } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { getLink, type RegisteredLinkProps } from "@codegouvfr/react-dsfr/link";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { symToStr } from "tsafe/symToStr";

import "../../sass/components/tertiary-navigation.scss";
import { useTranslation } from "@/i18n";

export type TertiaryNavigationItem = {
    text: ReactNode;
    linkProps: RegisteredLinkProps;
    isActive?: boolean;
};

export type TertiaryNavigationProps = {
    items: TertiaryNavigationItem[];
    id?: string;
    className?: string;
};

export default function TertiaryNavigation(props: TertiaryNavigationProps) {
    const { t } = useTranslation("Common");
    const { items, id, className } = props;
    const reactId = useId();
    const collapseId = id ?? `tab-navigation-${reactId.replace(/:/g, "")}`;
    const activeItem = items.find((item) => item.isActive) ?? items[0];
    const [isExpanded, setIsExpanded] = useState(false);
    const { Link } = getLink();

    return (
        <div className={cx("tab-navigation", className)}>
            <nav className={fr.cx("fr-sidemenu")} aria-label={t("tab-nav")}>
                <div className={fr.cx("fr-sidemenu__inner")}>
                    <button
                        aria-expanded={isExpanded}
                        aria-controls={collapseId}
                        type="button"
                        className={fr.cx("fr-sidemenu__btn")}
                        onClick={() => setIsExpanded((previous) => !previous)}
                    >
                        {activeItem.text}
                    </button>
                    <div className={fr.cx("fr-collapse", { "fr-collapse--expanded": isExpanded })} id={collapseId}>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>
                                    {item.isActive ? (
                                        <div aria-current="page" className="tab-navigation__tab">
                                            {item.text}
                                        </div>
                                    ) : (
                                        <Link {...item.linkProps} className={cx("tab-navigation__tab", item.linkProps.className)}>
                                            {item.text}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

TertiaryNavigation.displayName = symToStr({ TertiaryNavigation });
