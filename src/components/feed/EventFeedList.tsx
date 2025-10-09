import {useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {EventFeed} from "@/components/feed/EventFeed.tsx";
import {useAuth} from "@/contexts/AuthContext.tsx";
import {Loader2} from "lucide-react";

interface EventFeedListProps {
    activeCategory: string;
}

export const EventFeedList = ({ activeCategory }: EventFeedListProps) => {
    const {isAuthenticated} = useAuth();
    
    const params = activeCategory === 'MY' ? undefined : { category: activeCategory };

    const {data, isLoading} = useGetUserEventFeed(
        params,
        {
            query: {
                enabled: isAuthenticated
            }
        }
    );

    if (isLoading || !data) {
        return (<div className="flex justify-center items-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>)
    }

    return (
        <div className="px-3 flex flex-col gap-4">
            {data.eventIds.map((e) => (
                <EventFeed key={e || Math.random()} eventId={e}/>
            ))}
        </div>
    );
};