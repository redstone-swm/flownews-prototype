import {Clock} from 'lucide-react';
import {data} from '../data/historyData'
import Breadcrumbs from "@/components/ui/breadcrumb.tsx";
import {useNavigate, useParams} from "@tanstack/react-router";

interface TopicHistoryItemProps {
    eventId: number;
    title: string;
    datetime: string;
    description: string;
    thumbnail?: string;
    onClick?: () => void;
}

interface TopicHistoryHeaderProps {
    title: string;
    description: string;
}

const TopicHistoryItem = ({title, datetime, description, thumbnail, onClick}: TopicHistoryItemProps) => (
    <div className="relative group" onClick={onClick}>
        <div className="absolute left-6 top-0 h-full w-0.5 bg-gradient-to-b from-primary/50 to-muted-foreground/30"/>
        <div
            className="absolute left-4 top-6 h-4 w-4 rounded-full bg-primary shadow-lg border-4 border-background group-hover:scale-110 transition-transform duration-200"/>

        <div className="ml-16 mb-8">
            <div
                className="bg-card rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group-hover:border-primary/20">
                {thumbnail && (
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={thumbnail}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
                    </div>
                )}

                <div className="p-6">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <Clock className="h-4 w-4"/>
                        <span>{datetime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                        {title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </div>
);

function TopicHeader({title, description}: TopicHistoryHeaderProps) {
    return (
        <>
            <h1 className="text-3xl font-bold text-foreground mb-2">
                {title}
            </h1>
            <p className="text-muted-foreground">
                {description}
            </p>
        </>
    )
}

export default function TopicHistoryPage() {
    const {header, category, subcategory, items} = data;
    const navigate = useNavigate();
    const {topicId} = useParams({from: "/topics/$topicId/events/"});

    const goEventPage = (topicId: number, eventId: number) => navigate({to: `/topics/${topicId}/events/${eventId}`})

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <Breadcrumbs category={category} subcategory={subcategory}/>
                <TopicHeader title={header.title} description={header.description}/>
            </div>

            <div className="relative">
                {items.map((item, index) => (
                    <TopicHistoryItem key={index} {...item} onClick={() => goEventPage(topicId, item.eventId)}/>
                ))}
            </div>
        </div>
    );
}