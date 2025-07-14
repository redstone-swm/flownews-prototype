import TopicCarousel from "@/components/topic/TopicCarousel.tsx";
import TopicMainCarousel from "@/components/topic/TopicMainCarousel.tsx";
import NavbarLayout from "@/layouts/NavbarLayout.tsx";
import {useMainTopics} from "@/hooks/useMainTopics.tsx";

export default function MainPage() {
    const {data, isLoading, error} = useMainTopics();
    const sections = data?.sections || [];

    if (isLoading || sections.length === 0) {
        return;
    }

    return (
        <NavbarLayout>
            <div className="space-y-6 md:space-y-10 px-2 md:px-0 py-4">
                <section>
                    <TopicMainCarousel items={sections[0].topics}/>
                </section>

                {
                    sections.slice(1).map((section, index) => (
                        <section key={index}>
                            <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
                            <TopicCarousel items={section.topics}/>
                        </section>
                    ))
                }

            </div>
        </NavbarLayout>
    )
}
