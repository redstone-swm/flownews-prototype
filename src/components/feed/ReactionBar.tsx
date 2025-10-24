import * as React from "react"
import {Share} from "lucide-react"
import {cn} from "@/lib/utils.ts"
import type {ReactionSummaryResponse} from "@/api/models";
import {ReactionItem} from "@/components/feed/ReactionItem.tsx";
import {ReactionIcons} from "@/constants/ReactionIcons.tsx";
import {Button} from "@/components/ui";
import {TopicFollowButton} from "@/components/feed/TopicFollowButton.tsx";
import {Share as CapacitorShare} from '@capacitor/share';
import {Capacitor} from "@capacitor/core";
import {toast} from "sonner";


export interface ReactionBarProps extends React.HTMLAttributes<HTMLDivElement> {
    eventId: number
    topicId: number
    isFollowing: boolean
    reactions: ReactionSummaryResponse[]
    onReactionChange?: () => void
}

export const ReactionBar: React.FC<ReactionBarProps> = ({
                                                            eventId,
                                                            topicId,
                                                            isFollowing,
                                                            className,
                                                            reactions,
                                                            onReactionChange,
                                                            ...props
                                                        }) => {
    // reactionTypeId가 1인 반응 찾기 (좋아요/하트)
    const heartReaction = reactions.find(r => r.reactionTypeId === 1);

    const handleShare = async () => {
        const shareUrl = `${window.location.origin}/topics/${topicId}/events/${eventId}`;

        try {
            if (Capacitor.isNativePlatform()) {
                const {value} = await CapacitorShare.canShare();
                if (value) {
                    await CapacitorShare.share({
                        url: shareUrl,
                    });
                }
            } else {
                await navigator.clipboard.writeText(shareUrl);
                toast.success('링크가 클립보드에 복사되었습니다.');
            }
        } catch (error) {
            console.error('Share error:', error);
            toast.error('공유 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={cn("w-full h-full flex items-center", className)} {...props}>
            <div className="flex-grow min-w-0">
                <TopicFollowButton 
                    variant="ghost"
                    showTooltip={false}
                    onFollowStateChange={onReactionChange} 
                    topicId={topicId} 
                    isFollowing={isFollowing}
                    eventId={eventId}
                />

            </div>
            {heartReaction && (
                <ReactionItem
                    reactionTypeId={1}
                    eventId={eventId}
                    icon={ReactionIcons[1]}
                    count={heartReaction.count}
                    isActive={heartReaction.isActive}
                    onChange={onReactionChange}
                />
            )}
            <Button variant="ghost" className="border-l py-3 px-2 w-[72px] shrink-0" onClick={handleShare}>
                <Share size={20}/>
            </Button>
        </div>
    )
}