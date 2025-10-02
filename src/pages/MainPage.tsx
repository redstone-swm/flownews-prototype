import NavbarLayout from "@/components/layout/NavbarLayout.tsx";
import {useGetUserEventFeed} from "@/api/event-feed/event-feed.ts";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {CategoryBar} from "@/components/feed/CategoryBar.tsx";
import {EventFeed} from "@/components/feed/EventFeed.tsx";


export default function MainPage() {
    const {data, isLoading, refetch} = useGetUserEventFeed();

    const handleRefresh = async () => {
        await refetch();
    };

    if (isLoading || !data) {
        return;
    }

    console.log(data)
    return (
        <NavbarLayout>
            {/*<PullToRefresh onRefresh={handleRefresh}>*/}
            <Tabs defaultValue="feed">
                <TabsList variant="outline" className="w-full ">
                    <TabsTrigger
                        value="feed"
                        variant="outline"
                        className="flex-1"
                    >
                        기사 모아보기
                    </TabsTrigger>
                    <TabsTrigger
                        value="dashboard"
                        variant="outline"
                        className="flex-1"
                    >
                        대시보드
                    </TabsTrigger>
                    <TabsTrigger
                        value="myinfo"
                        variant="outline"
                        className="flex-1"
                    >
                        내 정보
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="feed">
                    <div className="flex flex-col gap-4">
                        <CategoryBar/>
                        <div className="px-3 flex flex-col gap-4">
                            {data.eventIds.map((e) => (
                                <EventFeed key={e || Math.random()} eventId={e}/>
                            ))}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="dashboard">
                    Change your password here.
                </TabsContent>
            </Tabs>

            {/*</PullToRefresh>*/}
        </NavbarLayout>
    );
}
