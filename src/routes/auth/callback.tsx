import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useEffect} from 'react'
import {useAuth} from '@/contexts/AuthContext'
import {Capacitor} from "@capacitor/core";

export const Route = createFileRoute('/auth/callback')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const {login} = useAuth()

    useEffect(() => {
        // URL에서 token 파라미터 추출
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')

        if (token) {
            if(Capacitor.isNativePlatform()){
                window.location.href = `sijeom://auth/callback?token=${token}`;
            }

            // AuthContext의 login 함수를 사용하여 토큰 저장 및 사용자 정보 로드
            login(token)
            console.log('토큰이 저장되었습니다:', token)
        } else {
            // 토큰이 없으면 로그인 페이지로 리다이렉트
            console.error('토큰을 찾을 수 없습니다')
            navigate({to: '/auth/login'})
        }
    }, [navigate, login])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">로그인 처리 중...</p>
            </div>
        </div>
    )
}
