/** user */
export type CartesUser = {
    id: string;
    email: string;
    user_name: string;
    first_name?: string | null;
    last_name?: string | null;
    roles: string[];
    account_creation_date?: string;
    last_login_date?: string;
    documents_quota?: number;
    documents_use?: number;
    keys_quota?: number;
    keys_use?: number;
};
