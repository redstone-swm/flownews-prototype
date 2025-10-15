import {Card} from "@/components/ui";
import {EventImage} from "@/components/feed/EventImage.tsx";
import {TopicFollowButton} from "@/components/feed/TopicFollowButton.tsx";
import {ReactionItem} from "@/components/feed/ReactionItem.tsx";
import {ReactionIcons} from "@/constants/ReactionIcons.tsx";
import type {EventSummaryResponse} from "@/api/models";
import * as React from "react";
import {NewsArticleReference} from "@/components/feed/news-article-reference.tsx";

interface EventDetailCardProps {
    event: EventSummaryResponse;
    topicId: number;
    isFollowing: boolean;
    onFollowStateChange?: (newIsFollowing: boolean) => void;
    // 활성 카드일 때만 툴팁을 보여주기 위한 부모 제어 플래그
    showTooltip?: boolean;
}

export const EventDetailCard = ({
                                    event,
                                    topicId,
                                    isFollowing,
                                    onFollowStateChange,
                                    showTooltip = false
                                }: EventDetailCardProps) => {
    const likeReaction = event.reactions.find(reaction => reaction.reactionTypeId === 1);
    const cardRef = React.useRef<HTMLDivElement | null>(null);

    // 사용자 상호작용 시(특히 터치) 툴팁을 닫기 위한 dismiss 상태
    const [isTooltipDismissed, setIsTooltipDismissed] = React.useState(false);
    React.useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (e.pointerType === 'touch') {
                setIsTooltipDismissed(true);
            }
        };
        const onTouchStart = () => {
            setIsTooltipDismissed(true);
        };
        // document 레벨에서 터치 감지
        document.addEventListener('pointerdown', onPointerDown, {passive: true});
        document.addEventListener('touchstart', onTouchStart, {passive: true});
        return () => {
            document.removeEventListener('pointerdown', onPointerDown as unknown as EventListener);
            document.removeEventListener('touchstart', onTouchStart as unknown as EventListener);
        };
    }, []);

    // 부모 제어와 dismiss 상태를 결합해 실제 툴팁 오픈 여부를 계산
    const effectiveShowTooltip = !!showTooltip && !isTooltipDismissed;

    return (
        <Card ref={cardRef}
              className="h-[560px] max-h-[80vh] p-4 flex flex-col gap-3 overflow-hidden">
            <h3 className="text-lg font-bold mb-0.5">
                {event.title}
            </h3>
            <EventImage imageUrl={event.imageUrl} title={event.title}/>
            {/* 스크롤 가능한 본문/기사 영역 */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {event.description}
                </p>
                {event.articles && event.articles.length > 0 && (
                    <div className="mt-3 space-y-1">
                        <div className="text-center text-xs sm:text-sm font-bold text-muted-foreground">관련 기사</div>
                        <div className="space-y-2">
                            {event.articles.map((article) => (
                                <NewsArticleReference key={article.id} article={article} eventId={event.id}/>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex gap-2.5 items-center justify-center">
                <ReactionItem
                    reactionTypeId={1}
                    eventId={event.id}
                    icon={ReactionIcons[1]}
                    count={likeReaction?.count ?? 0}
                    isActive={likeReaction?.isActive ?? false}
                />
                <TopicFollowButton
                    topicId={topicId}
                    isFollowing={isFollowing}
                    variant="default"
                    eventId={event.id}
                    onFollowStateChange={onFollowStateChange}
                    tooltipContainer={cardRef.current}
                    showTooltip={effectiveShowTooltip}
                />
            </div>
        </Card>
    );
};