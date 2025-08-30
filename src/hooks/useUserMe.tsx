import {useQuery} from '@tanstack/react-query';
import {useAccessToken} from "@/hooks/useAccessToken.ts";
import {getCurrentUser} from "@/api/user-query-api/user-query-api.ts"; // 함수명 변경

export const useUserMe = () => {
    const {token, loading} = useAccessToken();
    return useQuery({
        queryKey: ['userMe'],
        queryFn: getCurrentUser,
        enabled: !loading && !!token,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });
};
