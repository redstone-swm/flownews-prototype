import {createFileRoute} from '@tanstack/react-router'
import TopicHistoryPage from "@/pages/TopicHistoryPage.tsx";

export const Route = createFileRoute('/topics/$topicId/')({
    component: TopicHistoryPage,
})