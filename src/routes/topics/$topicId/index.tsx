import {createFileRoute, useParams} from '@tanstack/react-router'
import TopicHistoryPage from "@/pages/TopicHistoryPage.tsx";

export const Route = createFileRoute('/topics/$topicId/')({
    component: () => {
        const topicId = useParams({
            from: "/topics/$topicId/",
            select: (params) => params.topicId,
        })

        return <TopicHistoryPage key={topicId}/>
    },
})