import * as React from "react"
import {Button} from "@/components/ui/button.tsx"
import {useToggleSubscription} from "@/api/topic-subscriptions/topic-subscriptions"
import {cn} from "@/lib/utils.ts";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";
import {Check, Plus} from "lucide-react";
import {toast} from "sonner";

export interface TopicFollowButtonProps {
    variant: "default" | "ghost"
    topicId: number
    isFollowing: boolean
    onFollowStateChange?: (newIsFollowing: boolean) => void
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
    const toggleSubscriptionMutation = useToggleSubscription({
        mutation: {
            onSuccess: (response) => {
                const newIsFollowing = response.isSubscribed;
                if (newIsFollowing) {
                    toast.success("관련 소식을 빠르게 알려드릴게요!");
                }
                onFollowStateChange?.(newIsFollowing);
            },
            onError: (error) => {
                console.error('Failed to toggle subscription:', error);
            }
        }
    })

    const handleToggle = async () => {
        // Track the topic followed interaction
        if (eventId) {
            trackTopicFollowed(eventId, JSON.stringify({
                topicId,
                action: isFollowing ? 'unfollow' : 'follow',
                wasFollowing: isFollowing
            }));
        }

        toggleSubscriptionMutation.mutate({topicId});
    }

    return (
        <Button
            onClick={handleToggle}
            className={cn("border-r py-3 px-2 text-sm w-full  font-semibold", className)}
            disabled={toggleSubscriptionMutation.isPending}
            variant={isFollowing ? "ghost" : variant}>
            {
                isFollowing ? (
                    <span className={cn("text-muted-foreground flex items-center gap-1")}>
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