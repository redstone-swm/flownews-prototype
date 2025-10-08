import {createFileRoute, useParams} from '@tanstack/react-router'
import TopicDetailsPage from "@/pages/TopicDetailsPage.tsx";

export const Route = createFileRoute('/topics/$topicId/')({
    component: () => {
        const {topicId} = useParams({from: '/topics/$topicId/'});
        return <TopicDetailsPage topicId={Number(topicId)}/>
    }
})