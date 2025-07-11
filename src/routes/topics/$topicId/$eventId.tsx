import {createFileRoute} from '@tanstack/react-router'
import EventPage from "@/pages/EventPage.tsx";

export const Route = createFileRoute('/topics/$topicId/$eventId')({
    component: EventPage,
})