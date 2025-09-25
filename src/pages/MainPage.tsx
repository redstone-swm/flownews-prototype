import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {EventFeed, PullToRefresh} from "@/components/ui";


export default function MainPage() {
    const {data, isLoading, refetch} = useGetUserEventFeed();

    const handleRefresh = async () => {
        await refetch();
    };

    if (isLoading || !data) {
        return (<>Loading...</>);
    }

    console.log(data)
    return (
        <NavbarLayout>
            <PullToRefresh onRefresh={handleRefresh}>
                {data.eventIds.map((e) => (
                    <EventFeed key={e || Math.random()} eventId={e}/>
                ))}
            </PullToRefresh>
        </NavbarLayout>
    );
}
