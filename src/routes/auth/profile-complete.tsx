import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useMemo, useState} from 'react'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {useAuth} from '@/contexts/AuthContext'
import {useUpdateProfile} from '@/api/user-profile/user-profile'
import {UserProfileUpdateRequestGender} from '@/api/models/userProfileUpdateRequestGender'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter as DialogActionFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import {ScrollArea} from '@/components/ui/scroll-area'

export const Route = createFileRoute('/auth/profile-complete')({
    component: ProfileCompleteComponent,
})

interface ProfileData {
    birthDate: string
    gender: UserProfileUpdateRequestGender | ''
    privacyConsent: boolean
}

function ProfileCompleteComponent() {
    const navigate = useNavigate()
    const {refreshUser} = useAuth()
    const [profileData, setProfileData] = useState<ProfileData>({
        birthDate: '',
        gender: '',
        privacyConsent: false,
    })

    // local state for date selection
    const [year, setYear] = useState<number | null>(null)
    const [month, setMonth] = useState<number | null>(null) // 1-12
    const [day, setDay] = useState<number | null>(null)

    const currentYear = new Date().getFullYear()

    const years = useMemo(() => {
        // 1900 ~ current year descending
        const arr: number[] = []
        for (let y = currentYear; y >= 1900; y--) arr.push(y)
        return arr
    }, [currentYear])

    const months = useMemo(() => Array.from({length: 12}, (_, i) => i + 1), [])

    const daysInMonth = (y: number, m: number) => {
        // month is 1-based; using 0 for day returns last day of previous month
        return new Date(y, m, 0).getDate()
    }

    const days = useMemo(() => {
        if (!year || !month) return Array.from({length: 31}, (_, i) => i + 1)
        return Array.from({length: daysInMonth(year, month)}, (_, i) => i + 1)
    }, [year, month])

    const updateProfileMutation = useUpdateProfile({
        mutation: {
            onSuccess: async () => {
                await refreshUser()
                navigate({to: '/'})
            },
            onError: (error) => {
                console.error('프로필 완성 오류:', error)
                alert('프로필 완성에 실패했습니다. 다시 시도해주세요.')
            }
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!year || !month || !day || !profileData.gender || !profileData.privacyConsent) {
            alert('모든 필드를 입력해주세요.')
            return
        }

        const yyyy = String(year)
        const mm = String(month).padStart(2, '0')
        const dd = String(day).padStart(2, '0')
        const birthDate = `${yyyy}-${mm}-${dd}`

        updateProfileMutation.mutate({
            data: {
                birthDate,
                gender: profileData.gender,
            }
        })
    }

    // Ensure selected day remains valid when year/month change
    const handleYearSelect = (y: number) => {
        setYear(y)
        if (month && day) {
            const maxDay = daysInMonth(y, month)
            if (day > maxDay) setDay(null)
        }
    }

    const handleMonthSelect = (m: number) => {
        setMonth(m)
        if (year && day) {
            const maxDay = daysInMonth(year, m)
            if (day > maxDay) setDay(null)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">회원가입</CardTitle>
                    <CardDescription>마지막 단계에요!</CardDescription>
                </CardHeader>

                <CardContent>
                    <form id="profile-complete-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Birthdate */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground">생년월일</label>
                            <div className="grid grid-cols-3 gap-2">
                                {/* Year */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button type="button" variant="outline" role="combobox"
                                                className="justify-between w-full">
                                            {year ? `${year}년` : '연도 선택'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="max-h-72 w-32">
                                        {years.map((y) => (
                                            <DropdownMenuItem key={y} onClick={() => handleYearSelect(y)}>
                                                {y}년
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Month */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button type="button" variant="outline" role="combobox"
                                                className="justify-between w-full">
                                            {month ? `${month}월` : '월 선택'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="max-h-72 w-28">
                                        {months.map((m) => (
                                            <DropdownMenuItem key={m} onClick={() => handleMonthSelect(m)}>
                                                {m}월
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                {/* Day */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button type="button" variant="outline" role="combobox"
                                                className="justify-between w-full">
                                            {day ? `${day}일` : '일 선택'}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="max-h-72 w-24">
                                        {days.map((d) => (
                                            <DropdownMenuItem key={d} onClick={() => setDay(d)}>
                                                {d}일
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="h-px bg-muted"/>

                        {/* Gender */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-foreground">성별</label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={UserProfileUpdateRequestGender.MALE}
                                        checked={profileData.gender === UserProfileUpdateRequestGender.MALE}
                                        onChange={(e) => setProfileData(prev => ({
                                            ...prev,
                                            gender: e.target.value as UserProfileUpdateRequestGender
                                        }))}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-foreground">남성</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={UserProfileUpdateRequestGender.FEMALE}
                                        checked={profileData.gender === UserProfileUpdateRequestGender.FEMALE}
                                        onChange={(e) => setProfileData(prev => ({
                                            ...prev,
                                            gender: e.target.value as UserProfileUpdateRequestGender
                                        }))}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="text-sm text-foreground">여성</span>
                                </label>
                            </div>
                        </div>

                        <div className="h-px bg-muted"/>

                        {/* Privacy consent */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-sm font-medium text-foreground">개인정보 수집 및 이용 동의</div>
                                <div className="flex items-center gap-3">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button type="button" variant="link" size="sm" className="px-0">보기</Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-lg">
                                            <DialogHeader>
                                                <DialogTitle>개인정보 수집 및 이용 동의</DialogTitle>
                                                <DialogDescription>서비스 제공을 위한 필수 항목 안내</DialogDescription>
                                            </DialogHeader>
                                            <ScrollArea className="max-h-[60vh] pr-4">
                                                <div className="space-y-4 text-sm text-muted-foreground">
                                                    <section>
                                                        <h4 className="font-medium text-foreground mb-1">1. 수집 항목</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            <li>생년월일, 성별</li>
                                                            <li>서비스 이용 과정에서 자동 생성되는 로그 및 기기 정보(선택)</li>
                                                        </ul>
                                                    </section>
                                                    <section>
                                                        <h4 className="font-medium text-foreground mb-1">2. 이용 목적</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            <li>개인화된 콘텐츠 제공 및 서비스 품질 향상</li>
                                                            <li>이용자 식별 및 부정 이용 방지</li>
                                                        </ul>
                                                    </section>
                                                    <section>
                                                        <h4 className="font-medium text-foreground mb-1">3. 보유 및 이용
                                                            기간</h4>
                                                        <p>회원 탈퇴 또는 목적 달성 시까지 보유하며, 관련 법령에 따라 일정 기간 보관될 수 있습니다.</p>
                                                    </section>
                                                    <section>
                                                        <h4 className="font-medium text-foreground mb-1">4. 동의 거부 권리 및
                                                            불이익</h4>
                                                        <p>동의를 거부할 권리가 있으나, 동의하지 않을 경우 회원가입이 제한될 수 있습니다.</p>
                                                    </section>
                                                </div>
                                            </ScrollArea>
                                            <DialogActionFooter>
                                                <DialogClose asChild>
                                                    <Button type="button" variant="outline">닫기</Button>
                                                </DialogClose>
                                            </DialogActionFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            id="privacyConsent"
                                            checked={profileData.privacyConsent}
                                            onCheckedChange={(checked) =>
                                                setProfileData(prev => ({...prev, privacyConsent: checked === true}))
                                            }
                                            aria-label="개인정보 수집 및 이용에 동의"
                                        />
                                        <label htmlFor="privacyConsent" className="sr-only">개인정보 수집 및 이용에 동의</label>
                                    </div>
                                </div>
                            </div>

                            {/*<div className="text-xs text-muted-foreground">*/}
                            {/*    서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.*/}
                            {/*</div>*/}
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        form="profile-complete-form"
                        className="w-full"
                        disabled={updateProfileMutation.isPending || !year || !month || !day || !profileData.gender || !profileData.privacyConsent}
                    >
                        {updateProfileMutation.isPending ? '처리 중...' : '완료'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}