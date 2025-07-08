import {useQuery} from '@tanstack/react-query';
import {fetchUserMe} from '../api/userApi';
import {useAccessToken} from "@/hooks/useAccessToken.ts";

export const useUserMe = () => {
    const {token, loading} = useAccessToken();
    return useQuery({
        queryKey: ['userMe'],
        queryFn: fetchUserMe,
        enabled: !loading && !!token, // 토큰이 있고 활성화되었을 때만 실행
        retry: false, // 인증 실패 시 재시도하지 않음
        staleTime: 5 * 60 * 1000, // 5분간 데이터를 신선하게 유지
    });
};
