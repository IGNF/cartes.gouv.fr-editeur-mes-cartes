import type { components } from "./macarte-api";

type Schemas = components["schemas"];

/** Export direct des schémas Swagger */
export type Article = Schemas["Article"];
export type Bbox = Schemas["Bbox"];
export type MapAdd = Schemas["Map_add"];
export type MapItem = Schemas["Map_list"];
export type MapView = Schemas["Map_view"];
export type Media = Schemas["Media"];
export type MediaList = Schemas["Media_list"];
export type Notification = Schemas["Notification"];
export type Organization = Schemas["Organization"];
export type MapResearch = Schemas["Map_research"];
export type Theme = Schemas["Theme"];
export type Login = Schemas["Login"];
export type UserPublic = Schemas["User_public"];
export type UserEdit = Schemas["User_edit"];
export type UserMeEdit = Schemas["User_me_edit"];
export type UserView = Schemas["User_view"];
