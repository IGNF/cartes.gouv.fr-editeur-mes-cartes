import { api } from "@/api";
import { UserView } from "@/api/model";

export function useEditorUser(): UserView | undefined {
    const { data: user } = api.user.useGetMe({
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
    });
    return user;
}