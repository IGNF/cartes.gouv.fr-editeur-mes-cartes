import type { components } from "@/@types/macarte-api";

export type Schemas = components["schemas"];

export type MapList = Schemas["Map_list"];
export type MapView = Schemas["Map_view"];
export type MapResearch = Schemas["Map_research"];
export type Organization = Schemas["Organization"];
export type Theme = Schemas["Theme"];
export type Media = Schemas["Media"];
export type MediaList = Schemas["Media_list"];

export type MapsSearchParams = {
    context?: string;
    query?: string;
    theme?: string;
    type?: string;
    premium?: string;
    organization?: string;
    user?: string;
    active?: boolean;
    valid?: boolean;
    share?: string;
    sort?: string;
    limit?: string | number;
    offset?: number;
};

export type MediasSearchParams = {
    name?: string;
    id?: number;
    organization_id?: number;
    valid?: boolean;
    sort?: boolean;
    limit?: number;
    offset?: number;
};

export type OrganizationRole = {
    key?: string;
    value?: string;
};

export type OrganizationMembership = {
    public_id?: string;
    name?: string;
    profile_picture?: string;
    cover_picture?: string;
    user_role?: string;
    active?: string;
};
