import * as React from "react"
import {Button} from "@/components/ui/button.tsx"
import {useSubscribeTopic, useUnsubscribeTopic} from "@/api/topic-subscribe-api/topic-subscribe-api"
import type {UserDeviceTokenUpdateRequest} from "@/api/models"
import {cn} from "@/lib/utils.ts";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";
import {Check, Plus} from "lucide-react";
import {toast} from "sonner";

export interface TopicFollowButtonProps {
    variant: "default" | "ghost"
    topicId: number
    isFollowing: boolean
    onFollowStateChange?: () => void
    className?: string
    eventId?: number
}

export const TopicFollowButton: React.FC<TopicFollowButtonProps> = ({
                                                                        topicId,
                                                                        isFollowing,
                                                                        onFollowStateChange,
                                                                        className,
                                                                        eventId,
                                                                        variant = "ghost",
                                                                    }) => {
    const {trackTopicFollowed} = useInteractionTracking();
    const subscribeTopicMutation = useSubscribeTopic({
        mutation: {
            onSuccess: () => {
                toast.success("관련 소식을 빠르게 알려드릴게요!",)
                onFollowStateChange?.()
            },
            onError: (error) => {
                console.error('Failed to subscribe to topic:', error)
            }
        }
    })

    const unsubscribeTopicMutation = useUnsubscribeTopic({
        mutation: {
            onSuccess: () => {
                onFollowStateChange?.()
            },
            onError: (error) => {
                console.error('Failed to unsubscribe to topic:', error)
            }
        }
    })

    const handleFollow = async () => {
        if (isFollowing) {
            return
        }

        // Track the topic followed interaction
        if (eventId) {
            trackTopicFollowed(eventId, JSON.stringify({
                topicId,
                action: 'follow',
                wasFollowing: isFollowing
            }));
        }

        const deviceToken = localStorage.getItem('fcm-device-token') || ''

        const subscribeData: UserDeviceTokenUpdateRequest = {
            deviceToken
        }

        subscribeTopicMutation.mutate({
            topicId,
            data: subscribeData
        })
    }

    const handleUnfollow = async () => {
        if (!isFollowing) {
            return
        }

        unsubscribeTopicMutation.mutate({topicId})
    }

    return (
        <Button
            onClick={isFollowing ? handleUnfollow : handleFollow}
            className={cn("border-r py-3 px-2 text-sm w-full  font-semibold", className)}
            disabled={subscribeTopicMutation.isPending || unsubscribeTopicMutation.isPending}
            variant={variant}>
            {
                isFollowing ? (
                    <span className="text-muted-foreground flex items-center gap-1">
                        <Check size={16}/>
                        소식 받는 중
                    </span>) : (
                    <span
                        className={`${variant === "default" ? "text-background" : "text-primary"} flex items-center gap-1`}>
                        <Plus size={16}/>
                        관심 토픽에 추가
                    </span>)
            }
        </Button>
    )
}

TopicFollowButton.displayName = "TopicFollowButton"