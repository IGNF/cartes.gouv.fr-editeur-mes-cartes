export enum Share {
    RESTRICTED = "private",
    TEAM = "public",
    PUBLIC = "atlas",
}

// UserRoles.constants.ts
export const shareTypes = [Share.RESTRICTED, Share.TEAM, Share.PUBLIC] as const;
