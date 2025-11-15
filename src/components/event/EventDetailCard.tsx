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

    const [isTooltipDismissed, setIsTooltipDismissed] = React.useState(false);
    React.useEffect(() => {
        const dismiss = () => setIsTooltipDismissed(true);
        // 전역 상호작용 감지 (캡처 단계에서 등록하여 stopPropagation 영향 최소화)
        const opts: AddEventListenerOptions = {passive: true, capture: true};
        window.addEventListener('touchstart', dismiss, opts);
        window.addEventListener('pointerdown', dismiss, opts);
        window.addEventListener('mousedown', dismiss, opts);
        window.addEventListener('click', dismiss, opts);
        return () => {
            window.removeEventListener('touchstart', dismiss, opts);
            window.removeEventListener('pointerdown', dismiss, opts);
            window.removeEventListener('mousedown', dismiss, opts);
            window.removeEventListener('click', dismiss, opts);
        };
    }, []);

    // 외부에서 showTooltip을 다시 true로 올릴 때 이전 해제 상태를 초기화
    React.useEffect(() => {
        if (!showTooltip) {
            // 다음번 표시를 위해 해제 상태 초기화
            setIsTooltipDismissed(false);
        }
    }, [showTooltip]);

    const effectiveShowTooltip = !!showTooltip && !isTooltipDismissed;

    return (
        <Card ref={cardRef}
              className="h-[560px] max-h-[80vh] p-4 flex flex-col gap-3 overflow-hidden">
            <h3 className="text-lg font-bold mb-0.5">
                {event.title}
            </h3>
            {/* 스크롤 가능한 본문/기사 영역 */}
            <div className="flex-1 min-h-0 overflow-y-auto space-y-2">
                <EventImage imageUrl={event.imageUrl} title={event.title}/>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {event.description}
                </p>
                {event.articles && event.articles.length > 0 && (
                    <>
                        <div className="border-t border-gray-200 dark:border-gray-700"></div>
                        <div className="mt-3 space-y-1 px-2">
                            <div className="text-center text-xs sm:text-sm font-bold ">관련 기사</div>
                            <div className="space-y-2">
                                {event.articles.map((article) => (
                                    <NewsArticleReference key={article.id} article={article} eventId={event.id} eventTitle={event.title}/>
                                ))}
                            </div>
                        </div>
                    </>
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