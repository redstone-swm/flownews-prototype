import * as React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {useSubscribeTopic, useUnsubscribeTopic} from "@/api/topic-subscribe-api/topic-subscribe-api"
import type {UserDeviceTokenUpdateRequest} from "@/api/models"
import {cn} from "@/lib/utils.ts";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";

export interface TopicFollowButtonProps {
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
                                                                        eventId
                                                                    }) => {
    const {trackTopicFollowed} = useInteractionTracking();
    const subscribeTopicMutation = useSubscribeTopic({
        mutation: {
            onSuccess: () => {
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
            rounded={true}
            size="sm"
            variant={isFollowing ? "outline" : "default"}
            disabled={subscribeTopicMutation.isPending || unsubscribeTopicMutation.isPending}
            className={cn(className)}
        >
            {isFollowing
                ? "팔로잉"
                : "팔로우"
            }
        </Button>
    )
}

TopicFollowButton.displayName = "TopicFollowButton"