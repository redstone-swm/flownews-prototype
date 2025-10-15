import {cn} from "@/lib/utils.ts";
import {Badge, Button, Card, CardContent, CardFooter} from "@/components/ui";
import {Link} from "@tanstack/react-router";

export const AdFeed = ({className, ...props}: { className?: String }) => {


    return (
        <Card className={cn("mx-3 flex flex-col gap-4 rounded-[20px] overflow-hidden", className)} {...props}>
            <a
                href="https://open.kakao.com/o/gPoRnhXh"
            >
                <CardContent className="p-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center gap-3">

                            <Badge variant="gradient" className="text-xs py-1 px-2.5 flex items-center gap-1.5">
                                <span
                                    className="bg-gradient-to-r from-[#b8c8ff] to-[#a8d797] bg-clip-text text-transparent font-semibold">
                                    #
                                </span>
                                <span className="font-semibold">
                                    시점에 바란다!
                                </span>
                            </Badge>
                            {/*<div className="text-xs text-muted-foreground flex-shrink-0">*/}
                            {/*</div>*/}
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-bold   truncate">
                                시점 오픈채팅방에 놀러오세요!
                            </h3>
                            <div className="relative">
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    '시점' 팀에 직접 건의하고 싶은 의견이나, 불편한 점이 있으신가요? 시점 오픈채팅방에 참여하셔서 자유롭게 의견을 나눠보세요! 여러분의 소중한 피드백은
                                    시점을 더 나은 서비스로 만들어갑니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter
                    className="flex w-full h-full justify-center items-center mt-0 p-0 bg-gray-100">
                    <Button variant="ghost" className="w-full rounded-none">
                        들어가기
                    </Button>
                    {/*<ReactionBar*/}
                    {/*    eventId={eventId}*/}
                    {/*    reactions={eventSummary.reactions}*/}
                    {/*    onReactionChange={refetch}*/}
                    {/*    topicId={eventSummary.topics[0].id}*/}
                    {/*    isFollowing={eventSummary.topics[0].isFollowing}*/}
                    {/*/>*/}
                </CardFooter>
            </a>
        </Card>
    )
}