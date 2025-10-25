import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Checkbox} from '@/components/ui/checkbox'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {useAuth} from '@/contexts/AuthContext'
import {useUpdateProfile} from '@/api/user-profile/user-profile'
import {UserProfileUpdateRequestGender} from '@/api/models/userProfileUpdateRequestGender'
import {
    Dialog,
    DialogContent,
    DialogFooter as DialogActionFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog'
import {TermsOfServiceContent} from "@/components/auth/TermsOfServiceContent.tsx";

export const Route = createFileRoute('/auth/profile-complete')({
    component: ProfileCompleteComponent,
})

interface ProfileData {
    birthDate: string
    gender: UserProfileUpdateRequestGender | ''
    privacyConsent: boolean
    age14Consent: boolean
    termsOfServiceConsent: boolean
}

function ProfileCompleteComponent() {
    const navigate = useNavigate()
    const {refreshUser} = useAuth()
    const [profileData, setProfileData] = useState<ProfileData>({
        birthDate: '',
        gender: '',
        privacyConsent: false,
        age14Consent: false,
        termsOfServiceConsent: false,
    })

    const updateProfileMutation = useUpdateProfile({
        mutation: {
            onSuccess: async () => {
                await refreshUser()
                navigate({to: '/auth/topic-selection'})
            },
            onError: (error) => {
                console.error('프로필 완성 오류:', error)
                alert('프로필 완성에 실패했습니다. 다시 시도해주세요.')
            }
        }
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!profileData.privacyConsent || !profileData.age14Consent || !profileData.termsOfServiceConsent) {
            alert('모든 필드를 입력해주세요.')
            return
        }

        updateProfileMutation.mutate({
            data: {
                ...profileData,
                gender: profileData.gender || undefined
            }
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl ">회원가입</CardTitle>
                    <CardDescription>마지막 단계에요!</CardDescription>
                </CardHeader>

                <CardContent>
                    <form id="profile-complete-form" onSubmit={handleSubmit} className="space-y-2">
                        {/* 14세 이상 */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-foreground">만 14세 이상입니다.</div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="age14Consent"
                                    checked={profileData.age14Consent}
                                    onCheckedChange={(checked) =>
                                        setProfileData(prev => ({...prev, age14Consent: checked === true}))
                                    }
                                    aria-label="만 14세 이상임에 동의"
                                />
                                <label htmlFor="age14Consent" className="sr-only">만 14세 이상임에 동의</label>
                            </div>
                        </div>

                        {/* 개인정보 수집 및 이용동의 */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-foreground">개인정보 수집 및 이용동의</div>
                            <div className="flex items-center gap-3">
                                <Button asChild type="button" variant="link" size="sm" className="px-0">
                                    <a href="https://www.freeprivacypolicy.com/live/6d47cf20-e021-4397-a9a9-c734c4411deb"
                                       target="_blank" rel="noopener noreferrer">
                                        보기
                                    </a>
                                </Button>
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

                        {/* 이용약관 */}
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-foreground">서비스 이용약관</div>
                            <div className="flex items-center gap-3">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button type="button" variant="link" size="sm" className="px-0">보기</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <DialogHeader>
                                            <DialogTitle>서비스 이용약관</DialogTitle>
                                        </DialogHeader>
                                        <TermsOfServiceContent/>
                                        <DialogActionFooter>
                                            <DialogClose asChild>
                                                <Button type="button" variant="outline">닫기</Button>
                                            </DialogClose>
                                        </DialogActionFooter>
                                    </DialogContent>
                                </Dialog>
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="termsOfServiceConsent"
                                        checked={profileData.termsOfServiceConsent}
                                        onCheckedChange={(checked) =>
                                            setProfileData(prev => ({...prev, termsOfServiceConsent: checked === true}))
                                        }
                                        aria-label="서비스 이용약관"
                                    />
                                    <label htmlFor="termsOfServiceConsent" className="sr-only">서비스 이용약관</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        form="profile-complete-form"
                        className="w-full"
                        disabled={updateProfileMutation.isPending || !profileData.privacyConsent || !profileData.age14Consent || !profileData.termsOfServiceConsent}
                    >
                        {updateProfileMutation.isPending ? '처리 중...' : '완료'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}