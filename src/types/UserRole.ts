export enum UserRole {
  OWNER = "owner",
  MEMBER = "member",
  EDITOR = "editor",
}

// UserRoles.constants.ts
export const roleTypes = [UserRole.OWNER, UserRole.MEMBER, UserRole.EDITOR] as const;