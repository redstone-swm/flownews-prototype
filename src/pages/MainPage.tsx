import NavbarLayout from "@/layouts/NavbarLayout.tsx";
import {useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {EventFeed} from "@/components/ui";


export default function MainPage() {
    const {data, isLoading} = useGetUserEventFeed();
    if (isLoading || !data) {
        return (<>Loading...</>);
    }

    console.log(data)
    return (
        <NavbarLayout>
            {data.map((e) => (
                <EventFeed eventSummary={e}/>
            ))}
        </NavbarLayout>
    );
}
