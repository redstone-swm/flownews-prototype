import * as React from "react"
import {Button} from "@/components/ui/button.tsx"
import {useToggleSubscription} from "@/api/topic-subscriptions/topic-subscriptions"
import {cn} from "@/lib/utils.ts";
import {useInteractionTracking} from "@/hooks/useInteractionTracking.ts";
import {Check, Plus} from "lucide-react";
import {toast} from "sonner";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import LoginModal from "@/components/auth/LoginModal.tsx";

export interface TopicFollowButtonProps {
    variant: "default" | "ghost"
    showTooltip: boolean
    topicId: number
    isFollowing: boolean
    onFollowStateChange?: (newIsFollowing: boolean) => void
    className?: string
    eventId?: number
    // Tooltip을 특정 컨테이너(예: Card) 내부로 마운트하고 싶을 때 전달
    tooltipContainer?: HTMLElement | null

}

export const TopicFollowButton: React.FC<TopicFollowButtonProps> = ({
                                                                        topicId,
                                                                        isFollowing,
                                                                        onFollowStateChange,
                                                                        className,
                                                                        eventId,
                                                                        variant = "ghost",
                                                                        showTooltip = false,
                                                                        tooltipContainer,
                                                                    }) => {
    const {trackTopicFollowed} = useInteractionTracking();
    const {isAuthenticated} = useAuth();
    const [showLoginModal, setShowLoginModal] = React.useState(false);
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
        if (!isAuthenticated) {
            setShowLoginModal(true);
            return;
        }

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
        <>
            <TooltipProvider>
                <Tooltip open={showTooltip && !isFollowing}>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" className="z-10" container={tooltipContainer ?? undefined}>
                        토픽을 팔로우하고 후속기사 알림을 받아보세요!
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
        </>
    )
}

TopicFollowButton.displayName = "TopicFollowButton"