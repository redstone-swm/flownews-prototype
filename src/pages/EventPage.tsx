import {item} from "@/data/eventData.ts";
import {TopicBreadcrumb} from "@/components/topic/TopicBreadcrumb.tsx";

export default function EventPage() {

    return (
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8 py-6">
            <TopicBreadcrumb category={item.category} subcategory={item.subcategory}/>
            <h2 className="text-2xl font-bold leading-snug mb-4">{item.title}</h2>

            <div className="flex justify-end mb-4">
                <button className="text-sm bg-gray-100 text-gray-700 px-4 py-2 rounded-full">
                    {item.alertButtonText}
                </button>
            </div>

            <img
                src={item.imageUrl}
                alt={item.imageAlt}
                className="w-full rounded-md mb-6"
            />

            {item.content.map((paragraph, idx) => (
                <p key={idx} className="text-base text-gray-800 leading-relaxed mb-4">
                    {paragraph}
                </p>
            ))}
        </div>
    );
}