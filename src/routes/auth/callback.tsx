import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useEffect} from 'react'
import {useAuth} from '@/contexts/AuthContext'

export const Route = createFileRoute('/auth/callback')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate()
    const {login} = useAuth()

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const error = urlParams.get('error')

        if (error === 'DELETED') {
            alert('탈퇴된 회원입니다.')
            navigate({to: '/'})
            return
        }

        if (token) {
            login(token)
        } else {
            // 토큰이 없으면 로그인 페이지로 리다이렉트
            console.error('토큰을 찾을 수 없습니다')
            navigate({to: '/auth/login'})
        }
    }, [navigate])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">로그인 처리 중...</p>
            </div>
        </div>
    )
}
