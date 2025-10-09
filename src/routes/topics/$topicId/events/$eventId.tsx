import {createFileRoute, useParams} from '@tanstack/react-router'
import TopicDetailsPage from "@/pages/TopicDetailsPage.tsx";

export const Route = createFileRoute('/topics/$topicId/events/$eventId')({
    component: () => {
        const params = useParams({from: '/topics/$topicId/events/$eventId'});
        const topicId = Number(params.topicId);
        const eventId = Number(params.eventId);
        return <TopicDetailsPage topicId={topicId} eventId={Number.isNaN(eventId) ? undefined : eventId}/>
    }
})
