import TopicCarousel from "@/components/topic/TopicCarousel.tsx";
import TopicMainCarousel from "@/components/topic/TopicMainCarousel.tsx";
import NavbarLayout from "@/layouts/NavbarLayout.tsx";
import TopicSuggestionBanner from "@/components/feedback/TopicSuggestionBanner.tsx";
import {useGetAllTopics} from "@/api/topic-list-query-api/topic-list-query-api.ts";
import type {TopicSectionListQueryResponse} from "@/api/models";


export default function MainPage() {
    const {data, isLoading} = useGetAllTopics({
        request: {
            params: {for: 'main'}
        },
        query: {
            queryKey: ['/topics', 'main']
        }
    });
    const isTopicSectionList = data && 'sections' in data;
    const sections = isTopicSectionList ? (data as TopicSectionListQueryResponse).sections : [];

    if (isLoading || sections.length === 0) {
        return;
    }

    return (
        <NavbarLayout>
            <div className="space-y-16 md:space-y-24 px-2 md:px-0 py-4">
                <section>
                    <TopicMainCarousel items={sections[0].topics}/>
                </section>
                {
                    sections.slice(1).map((section, index) => (
                        <>
                            <section key={index}>
                                <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                                <TopicCarousel items={section.topics}/>
                            </section>
                            {index === 0 &&
                                <TopicSuggestionBanner/>}
                        </>
                    ))
                }

            </div>
        </NavbarLayout>
    )
}
