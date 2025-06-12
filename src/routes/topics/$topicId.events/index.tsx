import {createFileRoute} from '@tanstack/react-router'
import TopicHistoryPage from "@/pages/TopicHistoryPage.tsx";

export const Route = createFileRoute('/topics/$topicId/events/')({
    parseParams: (params) => ({ //FIXME Deprecated symbol
        topicId: Number(params.topicId)
    }),
    component: TopicHistoryPage,
})