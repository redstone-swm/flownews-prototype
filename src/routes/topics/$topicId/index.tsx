import {createFileRoute, useParams} from '@tanstack/react-router'
import TopicDetailPage from "@/pages/TopicDetailPage.tsx";

export const Route = createFileRoute('/topics/$topicId/')({
    component: () => {
        const topicId = useParams({
            from: "/topics/$topicId/",
            select: (params) => params.topicId,
        })

        return <TopicDetailPage key={topicId}/>
    },
})