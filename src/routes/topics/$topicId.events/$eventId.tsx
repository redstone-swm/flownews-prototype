import {createFileRoute} from '@tanstack/react-router'
import EventPage from "@/pages/EventPage.tsx";

export const Route = createFileRoute('/topics/$topicId/events/$eventId')({
    parseParams: (params) => ({ //FIXME Deprecated symbol
        topicId: Number(params.topicId),
        eventId: Number(params.eventId)
    }),
    component: EventPage,
})