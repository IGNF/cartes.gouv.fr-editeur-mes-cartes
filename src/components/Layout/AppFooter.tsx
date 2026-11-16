import { headerFooterDisplayItem } from "@codegouvfr/react-dsfr/Display";
import Footer from "@codegouvfr/react-dsfr/Footer";
import { memo } from "react";

import { externalUrls } from "@/router/externalUrls";
import { useTranslation } from "@/i18n";
// import { FooterConsentManagementItem, FooterPersonalDataPolicyItem } from "../../config/consentManagement";

const AppFooter = () => {
    const { t } = useTranslation("Layout");

    return (
        <Footer
            accessibility="partially compliant"
            accessibilityLinkProps={{
                href: externalUrls.accessibility,
            }}
            // brandTop={
            //     <>
            //         République
            //         <br />
            //         Française
            //     </>
            // }
            contentDescription={t("footer-description")}
            bottomItems={[
                {
                    linkProps: {
                        href: externalUrls.terms_of_service,
                    },
                    text: t("terms-of-service"),
                },
                {
                    linkProps: {
                        href: externalUrls.personal_data,
                    },
                    text: t("personal-data"),
                },
                // <FooterPersonalDataPolicyItem key="footer-personal-data-policy-item" />,
                // <FooterConsentManagementItem key="footer-consent-management-item" />,
                // Choix du thème clair/sombre
                headerFooterDisplayItem,
            ]}
            homeLinkProps={{
                href: externalUrls.dashboard,
                title: t("home-title"),
            }}
            termsLinkProps={{
                href: externalUrls.legal_notice,
            }}
            websiteMapLinkProps={{
                href: externalUrls.sitemap,
            }}
            partnersLogos={{
                main: {
                    alt: t("partner-ign"),
                    href: "https://www.ign.fr",
                    imgUrl: "https://data.geopf.fr/annexes/ressources/footer/ign.png",
                },
                sub: [
                    {
                        alt: t("partner-transformation-ministry"),
                        href: "https://www.transformation.gouv.fr/",
                        imgUrl: "https://data.geopf.fr/annexes/ressources/footer/min_fp.jpg",
                    },
                    {
                        alt: t("partner-ecology-ministry"),
                        href: "https://www.ecologie.gouv.fr/",
                        imgUrl: "https://data.geopf.fr/annexes/ressources/footer/min_ecologie.jpg",
                    },
                    {
                        alt: t("partner-cnig"),
                        href: "https://cnig.gouv.fr/",
                        imgUrl: "https://data.geopf.fr/annexes/ressources/footer/rf_cnig.jpg",
                    },
                ],
            }}
        />
    );
};

export default memo(AppFooter);
