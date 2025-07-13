import TopicCarousel from "@/components/topic/TopicCarousel.tsx";
import {mockTopicData} from "@/data/mockTopicData.ts";
import TopicMainCarousel from "@/components/topic/TopicMainCarousel.tsx";
import NavbarLayout from "@/layouts/NavbarLayout.tsx";
import TopicCard from "@/components/topic/TopicCard.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {useState, useEffect} from "react";

export default function MainPage() {
    // const {data: topics, isLoading} = useTopicList();
    const topics = mockTopicData
    const mainTopics = mockTopicData.slice(0, 5)
    const noteworthyTopics = mockTopicData.slice(5, 10);

    return (
        <NavbarLayout>
            <div className="space-y-6 md:space-y-10 px-2 md:px-0 py-4">
                <section className="">
                    <TopicMainCarousel items={mainTopics}/>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-2">주목할 만한 토픽</h2>
                    <TopicCarousel items={noteworthyTopics.map(t => ({
                        topicId: t.id,
                        title: t.title,
                        subtitle: t.description,
                        imageUrl: t.imageUrl
                    }))}/>
                </section>


            </div>
        </NavbarLayout>
    )
}
