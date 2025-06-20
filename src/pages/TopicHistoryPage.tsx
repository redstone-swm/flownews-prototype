import {Clock, Calendar, ArrowRight, Image as ImageIcon} from 'lucide-react';
import {useNavigate, useParams} from "@tanstack/react-router";
import {TopicBreadcrumb} from "@/components/topic/TopicBreadcrumb.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTopicDetails} from "@/hooks/useTopicDetails.tsx";

interface TopicHistoryItemProps {
    eventId: number;
    title: string;
    datetime: string;
    description: string;
    thumbnail?: string;
    onClick?: () => void;
    index: number;
    isLast: boolean;
}

interface TopicHistoryHeaderProps {
    title: string;
    description?: string;
    eventCount?: number;
}

const TopicHistoryItem = ({title, datetime, description, thumbnail, onClick, index, isLast}: TopicHistoryItemProps) => (
    <div className="relative group animate-in slide-in-from-left-5 fade-in duration-700"
         style={{animationDelay: `${index * 100}ms`}}>
        {/* Timeline line */}
        {!isLast && (
            <div
                className="absolute left-6 top-16 h-full w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent"/>
        )}

        {/* Timeline dot */}
        <div className="absolute left-4 top-8 z-10">
            <div className="h-4 w-4 rounded-full bg-primary shadow-lg border-4 border-background
                          group-hover:scale-125 group-hover:shadow-primary/25 transition-all duration-300 ease-out"/>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"/>
        </div>

        <div className="ml-16 mb-12">
            <Card className="group-hover:shadow-xl group-hover:shadow-primary/5 transition-all duration-500 overflow-hidden
                           border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm
                           hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
                  onClick={onClick}>

                {thumbnail && (
                    <div className="relative h-56 overflow-hidden bg-muted">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover transition-all duration-700
                                     group-hover:scale-110 group-hover:brightness-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent
                                      group-hover:from-black/20 transition-all duration-500"/>

                        {/* Floating date badge on image */}
                        <Badge variant="secondary" className="absolute top-4 right-4 bg-black/60 text-white border-0
                                                           backdrop-blur-sm hover:bg-black/80 transition-colors">
                            <Calendar className="h-3 w-3 mr-1"/>
                            {datetime}
                        </Badge>
                    </div>
                )}

                <CardContent className="p-8">
                    {/* Date section for items without thumbnail */}
                    {!thumbnail && (
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <Clock className="h-4 w-4 text-primary"/>
                            </div>
                            <span className="font-medium">{datetime}</span>
                        </div>
                    )}

                    <div className="">
                        <div className="flex items-start justify-between ">
                            <h3 className="text-3xl font-bold text-foreground leading-tight
                                         group-hover:text-primary transition-colors duration-300">
                                {title}
                            </h3>
                            {/*<Button variant="ghost" size="icon"*/}
                            {/*        className="shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300*/}
                            {/*               hover:bg-primary/10 hover:text-primary">*/}
                            {/*    <ArrowRight className="h-4 w-4"/>*/}
                            {/*</Button>*/}
                        </div>

                        <p className="text-muted-foreground leading-tight text-lg line-clamp-3">
                            {description}
                        </p>

                        {/*/!* Action hint *!/*/}
                        {/*<div className="flex items-center gap-2 text-xs text-muted-foreground/60*/}
                        {/*              opacity-0 group-hover:opacity-100 transition-all duration-300">*/}
                        {/*    <span>자세히 보기</span>*/}
                        {/*    <ArrowRight className="h-3 w-3"/>*/}
                        {/*</div>*/}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

function TopicHeader({title, description, eventCount}: TopicHistoryHeaderProps) {
    return (
        <div className="text-center space-y-6 py-8">
            <div className="space-y-4">
                <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                    {eventCount ? `${eventCount}개의 이벤트` : '히스토리'}
                </Badge>

                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70
                             bg-clip-text text-transparent leading-tight">
                    {title}
                </h1>

                {description && (
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        {description}
                    </p>
                )}
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"/>
                <div className="h-2 w-2 rounded-full bg-primary/50"/>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/50"/>
            </div>
        </div>
    )
}

function LoadingSkeleton() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <div className="space-y-4 text-center">
                <Skeleton className="h-8 w-32 mx-auto"/>
                <Skeleton className="h-12 w-64 mx-auto"/>
                <Skeleton className="h-6 w-96 mx-auto"/>
            </div>

            {[...Array(3)].map((_, i) => (
                <div key={i} className="relative ml-16">
                    <Card className="p-6 space-y-4">
                        <Skeleton className="h-48 w-full rounded-lg"/>
                        <div className="space-y-2">
                            <Skeleton className="h-6 w-3/4"/>
                            <Skeleton className="h-4 w-full"/>
                            <Skeleton className="h-4 w-2/3"/>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
}

export default function TopicHistoryPage() {
    const {topicId} = useParams({from: "/topics/$topicId/"});
    const topicIdNum = Number(topicId);
    const navigate = useNavigate();

    const {data, isLoading, error} = useTopicDetails(topicIdNum);

    const goEventPage = (topicId: number, eventId: number) =>
        navigate({to: `/topics/${topicId}/events/${eventId}`});

    if (isLoading) return <LoadingSkeleton/>;

    if (error) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Card className="p-8 text-center border-destructive/20">
                    <div className="space-y-4">
                        <div
                            className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
                            <ImageIcon className="h-6 w-6 text-destructive"/>
                        </div>
                        <h2 className="text-xl font-semibold text-destructive">로딩 오류</h2>
                        <p className="text-muted-foreground">토픽 정보를 불러올 수 없습니다.</p>
                        <Button variant="outline" onClick={() => window.location.reload()}>
                            다시 시도
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
            <div className="max-w-4xl mx-auto p-6 space-y-12">
                {/* Breadcrumb */}
                <div className="animate-in slide-in-from-top-3 fade-in duration-500">
                    <TopicBreadcrumb category="카테고리" subcategory={data.title}/>
                </div>

                {/* Header */}
                <div className="animate-in slide-in-from-top-4 fade-in duration-700">
                    <TopicHeader
                        title={data.title}
                        description={data.description}
                        eventCount={data.events?.length}
                    />
                </div>

                {/* Timeline */}
                <div className="relative space-y-0">
                    {data.events && data.events.length > 0 ? (
                        data.events.map((event, index) => (
                            <TopicHistoryItem
                                key={event.id}
                                eventId={event.id}
                                title={event.title}
                                datetime={new Date(event.eventTime).toLocaleDateString('ko-KR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                description={event.description || '상세 정보가 없습니다.'}
                                thumbnail={event.imageUrl}
                                onClick={() => goEventPage(topicIdNum, event.id)}
                                index={index}
                                isLast={index === data.events.length - 1}
                            />
                        ))
                    ) : (
                        <Card className="p-12 text-center">
                            <div className="space-y-4">
                                <div
                                    className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                                    <Clock className="h-8 w-8 text-muted-foreground"/>
                                </div>
                                <h3 className="text-lg font-semibold">이벤트가 없습니다</h3>
                                <p className="text-muted-foreground">아직 등록된 이벤트가 없습니다.</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}