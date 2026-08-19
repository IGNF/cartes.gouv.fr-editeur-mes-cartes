import { FC, useId, useState } from "react";

import { useTranslation } from "@/i18n";
import { api } from "@/api";
import { OrganizationLayoutChildrenProps } from "./OrganizationLayout";
import { fr } from "@codegouvfr/react-dsfr";
import Pagination from "@codegouvfr/react-dsfr/Pagination";
import { tss } from "tss-react";
import { UserRoles } from "./UserRoles";
import SearchBar from "@codegouvfr/react-dsfr/SearchBar";
import Badge from "@codegouvfr/react-dsfr/Badge";
import Button from "@codegouvfr/react-dsfr/Button";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { routes, useRoute } from "@/router/router";
import { useSearch } from "@/hooks/useSearch";
import { usePagination } from "@/hooks/usePagination";
import { useEditorUser } from "@/hooks/useEditorUser";
import LoadingText from "@/components/Utils/LoadingText";
import { createPortal } from "react-dom";
import { roleTypes, UserRole } from "@/types/UserRole";
import Select from "@codegouvfr/react-dsfr/SelectNext";

const addMemberModal = createModal({
    id: "confirm-remove-user-modal",
    isOpenedByDefault: false,
});

const confirmRemoveUserModal = createModal({
    id: "confirm-remove-user-modal",
    isOpenedByDefault: false,
});

const OrganizationMembers: FC<OrganizationLayoutChildrenProps> = ({ organizationId, role }) => {
    const { t } = useTranslation("Organization");
    const { t: tCommon } = useTranslation("Common");

    const { data: organization, isLoading } = api.organization.useGetOrganizationsById(
        organizationId,
        {
            query: {
                // Évite les erreurs typescript en vérifiant le bon retour
                select: (response) => {
                    if (response.status === 200) {
                        return response.data
                    }
                    else {
                        return undefined
                    }
                },
            },
        },
    );

    const user = useEditorUser();
    const [currentMember, setCurrentMember] = useState<string | undefined>(undefined);

    const { params } = useRoute();
    const page = params["page"] ? parseInt(params["page"]) : 1;
    const limit = params["limit"] ? parseInt(params["limit"]) : 20;


    const members = organization?.members ?? [];
    const { search, searchedItems } = useSearch(members, "public_name");
    console.log(search, searchedItems)
    const { paginatedItems, totalPages } = usePagination(searchedItems, page, limit);
    console.log(paginatedItems, totalPages)

    const tableId = useId();
    const { classes, cx } = useStyles();

    //  <Table
    //             caption={`Membres de l'espace ${organization.name}`}
    //             headers={[
    //                 "Nom",
    //                 "Rôle"
    //             ]}
    //             data={[...(organization.members ?? [])]
    //                 .sort((memberA, memberB) => {
    //                     return (roleOrder[memberA.role || 2] ?? 999) - (roleOrder[memberB.role || 2] ?? 999);
    //                 })
    //                 .map((member) => [
    //                     member.public_name,
    //                     t('user-role', member.role as UserRole)
    //                 ])}>

    //         </Table>

    // const isOpen = useIsModalOpen(confirmDeleteMapModal);

    return (
        <>
            {isLoading && <LoadingText />}
            {!isLoading && (
                <>
                    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-6v", "fr-mb-2v")}>
                        <div
                            className={fr.cx("fr-col-12", "fr-py-0")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <strong className={fr.cx("fr-text--xl", "fr-m-0", "fr-mr-2v")}>{t("members")}</strong>
                            <Badge severity="info" noIcon={true}>
                                {members.length ?? 0}
                            </Badge>
                            {role === UserRole.OWNER &&
                                <Button onClick={() => addMemberModal.open()} iconId="fr-icon-add-line" iconPosition="right" className={fr.cx("fr-ml-auto")}>
                                    {t("add-member")}
                                </Button>
                            }
                        </div>
                    </div>

                    <UserRoles />

                    <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters", "fr-mt-2v")}>
                        <div
                            className={fr.cx("fr-col-12")}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: fr.spacing("4v"),
                            }}
                        >
                            <SearchBar
                                label={tCommon("search")}
                                onButtonClick={(text) => {
                                    if (!isLoading) {
                                        routes.organization_members({
                                            organizationId: organizationId,
                                            search: text,
                                        }).replace();
                                    }
                                }}
                                allowEmptySearch={true}
                                renderInput={(props) => <input {...props} disabled={isLoading} />}
                                defaultValue={search}
                            />
                        </div>
                    </div>
                    <div
                        className={fr.cx(
                            "fr-table--lg",
                            "fr-table--layout-fixed",
                            "fr-table--no-caption",
                            "fr-mt-2w"
                        )}
                        id={`${tableId}-component`}
                    >
                        <div className={fr.cx("fr-table__wrapper")}>
                            <div className={fr.cx("fr-table__container")}>
                                <div className={cx(fr.cx("fr-table__content"), classes.tableContent)}>
                                    <table id={tableId}>
                                        <thead>
                                            <tr>
                                                <th className={fr.cx("fr-col--lg")} scope="col">{tCommon("username")}</th>
                                                <th scope="col">
                                                    {t("rights")}
                                                </th>
                                                {role === UserRole.OWNER &&
                                                    <th className={fr.cx("fr-col--xs")} scope="col">
                                                        <span className={fr.cx("fr-icon-delete-line")} />
                                                    </th>
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedItems?.map((member) => {
                                                const id = `table-${tableId}-row-key-${member.public_id}`;
                                                return (
                                                    <tr key={id} id={id} data-row-key={member.public_id}>
                                                        <td>
                                                            {member.public_name}{" "}
                                                            {member.public_id === user?.public_id && (
                                                                <Badge noIcon className={fr.cx("fr-ml-2v", "fr-badge--purple-glycine")} small>
                                                                    Moi
                                                                </Badge>
                                                            )}
                                                        </td>
                                                        <td>
                                                        {role === UserRole.OWNER ?
                                                            <Select
                                                                label={undefined}
                                                                nativeSelectProps={{
                                                                    "aria-label": t("select-member__label")
                                                                }}
                                                                options={roleTypes.map(value => ({
                                                                    value,
                                                                    "label": t("user-role", value),
                                                                    "selected": value === role
                                                                }))}
                                                            />

                                                                : <>{t("user-role", member.role as UserRole)}</>
                                                            
                                                        }
                                                        </td>

                                                        {role === UserRole.OWNER &&
                                                            <td>
                                                                <Button
                                                                    title={t("remove-member")}
                                                                    priority={"tertiary no outline"}
                                                                    iconId={"fr-icon-delete-line"}
                                                                    onClick={() => {
                                                                        setCurrentMember(member.public_id);
                                                                        confirmRemoveUserModal.open();
                                                                    }}
                                                                    disabled={member.public_id === user?.public_id}
                                                                />
                                                            </td>
                                                        }
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {totalPages > 1 ? (
                        <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-6v")}>
                            <Pagination
                                count={totalPages}
                                showFirstLast={true}
                                getPageLinkProps={(pageNumber) => ({
                                    ...routes.organization_members({
                                        organizationId: organizationId,
                                        page: pageNumber, limit: limit, search
                                    }).link,
                                })}
                                defaultPage={page}
                            />
                        </div>
                    ) : (
                        <div className={fr.cx("fr-grid-row", "fr-grid-row--center", "fr-mt-6v")}>
                        </div>
                    )}
                </>
            )
            }

            {
                role === UserRole.OWNER && createPortal(
                    <confirmRemoveUserModal.Component
                        title={t("remove-member")}
                        buttons={[
                            {
                                children: tCommon("cancel"),
                                priority: "secondary",
                            },
                            {
                                children: tCommon("delete"),
                                // onClick: () => {
                                //     if (openedOrganization?.public_id === undefined) {
                                //         return;
                                //     }
                                //     deleteOrganizationMutation.mutate({ id: openedOrganization.public_id });
                                // },
                                priority: "primary",
                                doClosesModal: true,
                            },
                        ]}
                    >
                        {t('delete-organization--message', { name: organization?.name })}

                        <div />
                    </confirmRemoveUserModal.Component>,
                    document.body
                )
            }

            {
                role === UserRole.OWNER && createPortal(
                    <addMemberModal.Component
                        title={t("remove-member")}
                        buttons={[
                            {
                                children: tCommon("cancel"),
                                priority: "secondary",
                            },
                            {
                                children: tCommon("delete"),
                                // onClick: () => {
                                //     if (openedOrganization?.public_id === undefined) {
                                //         return;
                                //     }
                                //     deleteOrganizationMutation.mutate({ id: openedOrganization.public_id });
                                // },
                                priority: "primary",
                                doClosesModal: true,
                            },
                        ]}
                    >
                        {t('delete-organization--message', { name: organization?.name })}

                        <div />
                    </addMemberModal.Component>,
                    document.body
                )
            }
        </>
    );
};

export default OrganizationMembers;


const useStyles = tss.withName({ OrganizationMembers }).create({
    tableContent: {
        "& table thead th": {
            backgroundColor: fr.colors.decisions.background.default.grey.default,
        },
        "& table thead th, & table tbody td": {
            backgroundImage: `linear-gradient(0deg, ${fr.colors.decisions.border.default.grey.default}, ${fr.colors.decisions.border.default.grey.default}),linear-gradient(0deg, var(--border-contrast-grey), var(--border-contrast-grey));`,
            height: "4rem",
        },
    },
});
