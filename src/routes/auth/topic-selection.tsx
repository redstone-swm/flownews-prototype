import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {useGetAllTopics} from '@/api/topic-list-query-api/topic-list-query-api'
import {useAuth} from '@/contexts/AuthContext'
import type {TopicSummaryResponse} from "@/api/models";
import {useToggleSubscription} from "@/api/topic-subscriptions/topic-subscriptions.ts";
import {useGATracking} from "@/hooks/useGATracking.ts";

export const Route = createFileRoute('/auth/topic-selection')({
    component: TopicSelectionComponent,
})

function TopicSelectionComponent() {
    const navigate = useNavigate()
    const {refreshUser} = useAuth()
    const {trackInterestedTopicClick} = useGATracking()
    const [selectedTopics, setSelectedTopics] = useState<number[]>([])
    const [isCompleting, setIsCompleting] = useState(false)

    const {data: topics, isLoading, error} = useGetAllTopics()

    const subscribeTopicMutation = useToggleSubscription()

    const handleTopicToggle = (topicId: number) => {
        setSelectedTopics(prev =>
            prev.includes(topicId)
                ? prev.filter(id => id !== topicId)
                : [...prev, topicId]
        )
    }

    const handleComplete = async () => {
        setIsCompleting(true)

        try {
            // GA4 이벤트 트래킹
            trackInterestedTopicClick(selectedTopics)


            // Subscribe to all selected topics
            for (const topicId of selectedTopics) {
                await subscribeTopicMutation.mutateAsync({
                    topicId
                })
            }

            await refreshUser()
            navigate({to: '/'})
        } catch (error) {
            console.error('토픽 팔로우 오류:', error)
            alert('토픽 팔로우에 실패했습니다. 다시 시도해주세요.')
        } finally {
            setIsCompleting(false)
        }
    }

    const handleSkip = async () => {
        await refreshUser()
        navigate({to: '/'})
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <div className="text-lg">토픽을 불러오는 중...</div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl text-destructive">오류가 발생했습니다</CardTitle>
                        <CardDescription>토픽을 불러올 수 없습니다.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Button onClick={handleSkip} className="w-full">
                            건너뛰기
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">환영합니다!</CardTitle>
                    <CardDescription>관심 토픽들을 팔로우해보세요</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                        {topics?.map((topic: TopicSummaryResponse) => (
                            <div
                                key={topic.id}
                                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                    selectedTopics.includes(topic.id)
                                        ? 'border-primary bg-primary/10'
                                        : 'border-border hover:border-primary/50'
                                }`}
                                onClick={() => handleTopicToggle(topic.id)}
                            >
                                <div className="flex items-start space-x-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-foreground truncate">
                                            {topic.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {topic.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                            selectedTopics.includes(topic.id)
                                                ? 'border-primary bg-primary'
                                                : 'border-muted-foreground'
                                        }`}>
                                            {selectedTopics.includes(topic.id) && (
                                                <svg className="w-3 h-3 text-primary-foreground" fill="currentColor"
                                                     viewBox="0 0 20 20">
                                                    <path fillRule="evenodd"
                                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={handleComplete}
                            className="flex-1"
                            disabled={isCompleting || selectedTopics.length === 0}
                        >
                            {isCompleting ? '완료 중...' : `다음`}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}