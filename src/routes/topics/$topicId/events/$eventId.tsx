import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/topics/$topicId/events/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/topics/$topicId/events/$eventId"!</div>
}
